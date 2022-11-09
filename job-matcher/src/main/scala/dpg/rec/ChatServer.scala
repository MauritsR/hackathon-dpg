package dpg.rec

import cats.effect.{ConcurrentEffect, ContextShift, Timer}
import fs2.concurrent.{Queue, Topic}
import org.http4s.server.blaze.BlazeServerBuilder
import org.http4s.implicits._
import org.http4s.server.middleware.{CORS, CORSConfig, Logger}
import fs2.{INothing, Stream}
import cats.implicits._
import dpg.rec.AppRoutes.{endConversation, jobsRoutes}

import scala.concurrent.duration.DurationInt

object ChatServer {

  def stream[F[_]: ConcurrentEffect](queue: Queue[F, FromClient], topic: Topic[F, ToClient])(implicit
    T: Timer[F],
    C: ContextShift[F]
  ): Stream[F, INothing] = {
    val httpApp      = (AppRoutes.chatRoutes(queue, topic) <+> endConversation(queue, topic) <+> jobsRoutes).orNotFound
    val config       = CORSConfig(anyOrigin = true, allowCredentials = false, maxAge = 10.day.toSeconds)
    val cors         = CORS(httpApp, config)
    val finalHttpApp = Logger.httpApp(logHeaders = true, logBody = true)(cors)
    for {
      exitCode <- BlazeServerBuilder[F]
        .bindHttp(8080, "0.0.0.0")
        .withHttpApp(finalHttpApp)
        .serve
    } yield exitCode
  }.drain
}
