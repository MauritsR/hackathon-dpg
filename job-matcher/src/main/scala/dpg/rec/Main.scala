package dpg.rec

import cats.effect.{ExitCode, IO, IOApp}
import cats.implicits._
import fs2.concurrent.{Queue, Topic}
import fs2.Stream

case class Message(author: String, content: String)
case class FromClient(userName: String, message: String)
case class ToClient(message: Message)

object Main extends IOApp {

  def run(args: List[String]): IO[ExitCode] =
    for (
      queue <- Queue.unbounded[IO, FromClient];
      topic <- Topic[IO, ToClient](ToClient(Message("Server", "Initiating conversation...")));
      exitCode <- {
        val messageStream = queue.dequeue
          .map { fromClient =>
            println(s"${fromClient.userName} - ${fromClient.message}")
            ToClient(Message(fromClient.userName, fromClient.message))
          }
          .through(topic.publish)

        val serverStream   = ChatServer.stream[IO](queue, topic)
        val combinedStream = Stream(messageStream, serverStream).parJoinUnbounded

        combinedStream.compile.drain.as(ExitCode.Success)
      }
    ) yield exitCode
}
