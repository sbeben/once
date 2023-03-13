import { FastifyPluginCallback } from "fastify";
import { WebSocket } from "ws";
import { jwtAuth } from "../auth/handlers.js";
import {
  createAndRetrieveConversation,
  createMessage,
  findRoomUsers,
  getRoomList,
  isConversationExist,
} from "./handlers.js";

type ConversationRoutesOpts = {};

export const wsHandler: FastifyPluginCallback<ConversationRoutesOpts> = (
  fastify,
  options,
  done
) => {
  let wsActiveClients: Record<string, WebSocket> = {};
  fastify.route({
    method: "GET",
    url: "/wsconnect",
    preValidation: jwtAuth,
    handler: (req, reply) => {
      // this will handle http requests
      //console.log("hahh");
      if (reply.statusCode === 401) {
        reply.code(401).send("GTFO");
      }
    },
    wsHandler: async (conn, req) => {
      conn.setEncoding("utf8");
      const user = req.user;
      const { data: roomList, error: roomListError } = await getRoomList(
        user.id
      );
      if (roomList) {
        conn.socket.send(JSON.stringify({ type: "roomList", data: roomList }));
      }
      if (roomListError) {
        conn.socket.send(
          JSON.stringify({ type: "error", data: roomListError })
        );
      }
      //this implementtion of rooms is obviosly bad with more than 1000 connections

      // conn.socket.id = user.id;
      // fastify.websocketServer.clients.forEach(function each(client) {
      //   if (client.readyState === 1) {
      //    change to find and check id and then send
      //   }
      // });

      //this is also not scalable solution
      //needs to be changed on something like https://github.com/fastify/help/issues/589
      //or on somewhat better solution proided by fastify team
      wsActiveClients[user.id] = conn.socket;

      conn.socket.on("message", async (message) => {
        const event = JSON.parse(message.toString());

        if (event.type === "createOrJoinRoom") {
          const key = Object.keys(event.data)[0] as
            | "shopId"
            | "branchId"
            | "userId";
          let otherUserId = "";

          if (key === "userId") {
            otherUserId = event.data.userId;
          }

          if (otherUserId.length < 1) {
            conn.socket.send(
              JSON.stringify({
                type: "error",
                data: "Cannot create or join room",
              })
            );
            return;
          }

          if (otherUserId === user.id) {
            conn.socket.send(
              JSON.stringify({
                type: "error",
                data: "Can't chat with yourself",
              })
            );
          }
          const { data } = await isConversationExist([otherUserId, user.id]);
          if (data) {
            conn.socket.send(
              JSON.stringify({
                type: "roomJoined",
                data: { id: data.id },
              })
            );
          } else {
            const { data: conversation, error } =
              await createAndRetrieveConversation(otherUserId, user.id);
            if (conversation) {
              conn.socket.send(
                JSON.stringify({
                  type: "roomCreated",
                  data: conversation,
                })
              );
            }
            if (error) {
              conn.socket.send(JSON.stringify({ type: "error", data: error }));
            }
          }
        }

        if (event.type === "message") {
          const { text, room } = event.data;
          const { data, error } = await createMessage({
            room,
            sender: user.id,
            text,
          });
          const { data: roomUsers, error: findRoomError } = await findRoomUsers(
            room
          );
          if (roomUsers) {
            const otherUsers = roomUsers.filter((uId) => uId !== user.id);
            otherUsers.forEach((uId) => {
              if (wsActiveClients[uId]) {
                wsActiveClients[uId].send(
                  JSON.stringify({
                    type: "roomMessage",
                    data: { ...data, isMe: false },
                  })
                );
              }
            });
          }
          conn.socket.send(
            JSON.stringify({
              type: "roomMessage",
              data: { ...data, isMe: true },
            })
          );
        }
      });

      conn.socket.on("close", (code, reason) => {
        //conn.end();
        conn.destroy();
        if (wsActiveClients[user.id]) {
          delete wsActiveClients[user.id];
        }
      });
      conn.socket.on("error", (err) => {
        console.log("err");
        conn.socket.send(err.message);
      });
      // conn.once("data", (chunk) => {
      //   conn.end();
      // });
    },
  });
  done();
};
