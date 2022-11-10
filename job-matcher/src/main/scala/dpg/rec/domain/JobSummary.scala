package dpg.rec.domain

case class JobSummary(
  id: Int,
  jobTitle: String,
  description: String,
  jobCharacteristic1: String,
  jobCharacteristic2: String,
  jobCharacteristic3: String,
  company: String,
  location: String,
  logo: String,
  photo: String,
  primaryColor: String
)
