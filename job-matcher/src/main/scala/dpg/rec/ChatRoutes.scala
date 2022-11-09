package dpg.rec

import cats.effect.{Concurrent, Sync}
import fs2.concurrent.{Queue, Topic}
import org.http4s.dsl.Http4sDsl
import org.http4s.HttpRoutes
import org.http4s.server.websocket.WebSocketBuilder
import org.http4s.websocket.WebSocketFrame

object ChatRoutes {

  def chatRoutes[F[_]: Sync: Concurrent](queue: Queue[F, FromClient], topic: Topic[F, ToClient]): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F] {}
    import dsl._

    HttpRoutes.of[F] { case GET -> Root / "ws" / userName =>
      val toClient = topic
        .subscribe(1000)
        .map(toClientMessage => WebSocketFrame.Text(toClientMessage.message))

      WebSocketBuilder[F].build(
        toClient,
        _.collect({ case WebSocketFrame.Text(text, _) =>
          FromClient(userName, text)
        })
          .through(queue.enqueue)
      )
    }
  }
}
