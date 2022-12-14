package dpg.rec

import cats.effect.{Concurrent, Sync}
import dpg.rec.domain.JobSummary
import fs2.concurrent.{Queue, Topic}
import io.circe.syntax.EncoderOps
import org.http4s.dsl.Http4sDsl
import org.http4s.HttpRoutes
import org.http4s.server.websocket.WebSocketBuilder
import org.http4s.websocket.WebSocketFrame
import org.http4s.circe._
import io.circe.generic.auto._

object AppRoutes {

  def jobsRoutes[F[_]: Sync: Concurrent]: HttpRoutes[F] = {
    val dsl = new Http4sDsl[F] {}
    import dsl._

    HttpRoutes.of[F] { case GET -> Root / "jobs" =>
      val jobs =
        List(
          JobSummary(
            1,
            "Support Engineer",
            "Iedere dag krijg je te maken met uitdagende IT-vraagstukken die rechtstreeks beroep doen op je eigen kennisniveau en oplossend vermogen. Het samenwerken met je collega's voelt voor jou als een vis in het water in een omgeving waar ruimte is voor iedereen. Met je enthousiasme ben je altijd op zoek naar de best passende oplossing voor onze klanten.",
            "Centric levert kennis en ervaring aan opdrachtgevers",
            "Samenwerken aan uitdagende opdrachten bij toonaangevende organisaties in jouw regio",
            "In relatief korte tijd veel leren en doorgroeien",
            "Centric",
            "Enschede",
            "https://raw.githubusercontent.com/MauritsR/hackathon-dpg/main/job-matcher/src/main/resources/attachements/logos/logo_centric.png?token=GHSAT0AAAAAABRFNBDBIAWXUK7ACZOCOXPAY3LUNBQ",
            "https://raw.githubusercontent.com/MauritsR/hackathon-dpg/main/job-matcher/src/main/resources/attachements/photos/photo_centric.jpeg?token=GHSAT0AAAAAABRFNBDAOBIHVWMOVUEJA3YQY3LUNRQ",
            "#32B345"
          ),
          JobSummary(
            2,
            "Servicemonteur Verwarmingsinstallatie",
            "Wil jij zorgen voor een beter klimaat? Vind jij duurzaamheid belangrijk en werk jij graag met milieuvriendelijke technologie? Dan is dit jouw baan, je werkt aan het onderhouden, controleren en verbeteren van werktuigkundige installaties, denk aan gas, water- en luchtleidingen.",
            "Internationale marktleider",
            "Verdieping in je vak als Servicemonteur",
            "Zelfstandige baan, vrijheid om het werk zelf in te delen",
            "VNOM",
            "Amsterdam",
            "https://raw.githubusercontent.com/MauritsR/hackathon-dpg/main/job-matcher/src/main/resources/attachements/logos/logo_vnom.jpeg?token=GHSAT0AAAAAABRFNBDAIIEK6LMK36GEO3UEY3LUOOQ",
            "https://raw.githubusercontent.com/MauritsR/hackathon-dpg/main/job-matcher/src/main/resources/attachements/photos/photo_vnom.jpeg?token=GHSAT0AAAAAABRFNBDBIP5U2QL7WD3QDXZYY3LUPIA",
            "#369FD4"
          ),
          JobSummary(
            3,
            "Facilitair Manager",
            "Het overtreffen van de verwachtingen van onze klanten, daar draait het bij ons om. Supply Chain in de Food Retail is topsport. Dag in, dag uit, hard en vooral slim werken om elk product op het juiste moment op de juiste plaats te krijgen.",
            "Jumbo groeit nog steeds, zowel in onze winkels als online",
            "Ontwikkeling en innovatie staan hoog op de agenda",
            "Je bent onderdeel van het managementteam op de building site",
            "Jumbo Supermarkten",
            "Nieuwegein",
            "https://raw.githubusercontent.com/MauritsR/hackathon-dpg/main/job-matcher/src/main/resources/attachements/logos/logo_jumbo.png?token=GHSAT0AAAAAABRFNBDAZH2PVEVIPQ5QEPVAY3LUPXA",
            "https://raw.githubusercontent.com/MauritsR/hackathon-dpg/main/job-matcher/src/main/resources/attachements/photos/photo_jumbo.jpeg?token=GHSAT0AAAAAABRFNBDBWXYCAHCYGVHASFOEY3LUQEA",
            "#FAD240"
          ),
          JobSummary(
            4,
            "Scala developer",
            "As a Scala engineer you will work on building the next generation marketplace platform for Nationale Vacaturebank & Intermediair. With our two well-known award winning brands in the Dutch labour market: Intermediair & Nationale Vacaturebank, we help thousands of people find the perfect job and help a multitude of companies find the perfect candidate.",
            "Work on building the next generation marketplace job platform",
            "Autonomous, cross-functional agile team",
            "Scala, Akka, Axon, AWS, Elasticsearch, Kubernetes, Cats, Cats Effect, fs2.io, http4s and sttp.",
            "DPG Media",
            "Amsterdam",
            "https://raw.githubusercontent.com/MauritsR/hackathon-dpg/main/job-matcher/src/main/resources/attachements/logos/logo_dpg_recruitment.png?token=GHSAT0AAAAAABRFNBDALXZKF4BJDC572C6EY3LUQRQ",
            "https://raw.githubusercontent.com/MauritsR/hackathon-dpg/main/job-matcher/src/main/resources/attachements/photos/photo_dpgmedia_1.png?token=GHSAT0AAAAAABRFNBDBP6RXKGVND5FWEMR4Y3LURBQ",
            "#252525"
          ),
          JobSummary(
            5,
            "React developer",
            "Do you want to develop a fast and seamless experience for two million users a month? Our goal is helping our users to find their next job.",
            "Work on building the next generation marketplace job platform",
            "Autonomous, cross-functional agile team",
            "Scala, Akka, Axon, AWS, Elasticsearch, Kubernetes, Cats, Cats Effect, fs2.io, http4s and sttp.",
            "DPG Media",
            "Amsterdam",
            "https://raw.githubusercontent.com/MauritsR/hackathon-dpg/main/job-matcher/src/main/resources/attachements/logos/logo_dpg_recruitment.png?token=GHSAT0AAAAAABRFNBDALXZKF4BJDC572C6EY3LUQRQ",
            "https://raw.githubusercontent.com/MauritsR/hackathon-dpg/main/job-matcher/src/main/resources/attachements/photos/photo_dpgmedia_2.jpeg?token=GHSAT0AAAAAABRFNBDADUUPHWD4G5WK6DKKY3LURPQ",
            "#252525"
          )
        )
      Ok(jobs.asJson)
    }
  }

  def endConversation[F[_]: Sync: Concurrent](queue: Queue[F, FromClient], topic: Topic[F, ToClient]): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F] {}
    import dsl._

    HttpRoutes.of[F] { case GET -> Root / "ws" / userName / "end" =>
      val toClient = topic
        .subscribe(1)
        .map(_ => WebSocketFrame.Close())

      WebSocketBuilder[F].build(
        toClient,
        _.collect({ case WebSocketFrame.Close(_) =>
          FromClient(userName, s"$userName has left the conversation")
        })
          .through(queue.enqueue)
      )
    }
  }

  def chatRoutes[F[_]: Sync: Concurrent](queue: Queue[F, FromClient], topic: Topic[F, ToClient]): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F] {}
    import dsl._

    HttpRoutes.of[F] { case GET -> Root / "ws" / userName =>
      val toClient = topic
        .subscribe(1000)
        .map(toClientMessage => WebSocketFrame.Text(toClientMessage.message.asJson.toString()))

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
