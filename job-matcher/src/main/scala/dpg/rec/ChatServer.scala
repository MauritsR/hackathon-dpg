package dpg.rec

import cats.effect.{ConcurrentEffect, ContextShift, Timer}
import fs2.concurrent.{Queue, Topic}
import org.http4s.server.blaze.BlazeServerBuilder
import org.http4s.implicits._
import org.http4s.server.middleware.Logger
import fs2.{INothing, Stream}

object ChatServer {

  def stream[F[_]: ConcurrentEffect](queue: Queue[F, FromClient], topic: Topic[F, ToClient])(implicit
    T: Timer[F],
    C: ContextShift[F]
  ): Stream[F, INothing] = {
    val httpApp      = ChatRoutes.chatRoutes(queue, topic).orNotFound
    val finalHttpApp = Logger.httpApp(logHeaders = true, logBody = true)(httpApp)
    for {
      exitCode <- BlazeServerBuilder[F]
        .bindHttp(8080, "0.0.0.0")
        .withHttpApp(finalHttpApp)
        .serve
    } yield exitCode
  }.drain
}
