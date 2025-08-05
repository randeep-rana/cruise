export const idProofslist = [
  { id: "-1", text: "Select ID Proof" },
  { id: "AADHAAR", text: "AADHAR CARD" },
  { id: "DRIVING_LICENSE", text: "DRIVING LICENSE" },
  { id: "PAN_CARD", text: "PAN CARD" },
  { id: "PASSPORT", text: "PASSPORT" },
  { id: "VOTER_ID", text: "VOTER ID" },
  { id: "BIRTH_CERTIFICATE", text: "BIRTH CERTIFICATE" },
]

export const adultIdProofslist = idProofslist.filter((idProof) => idProof.id !== "BIRTH_CERTIFICATE")

export const childIdProofslist = idProofslist.filter(
  (idProof) => idProof.id !== "PAN_CARD" && idProof.id !== "DRIVING_LICENSE" && idProof.id !== "VOTER_ID"
)

export const toastPassengerObject = {
  name: "Name",
  gender: "Gender",
  age: "Age",
  governmentIdType: "ID Type",
  governmentId: "ID number",
  mobileNumber: "Mobile Number",
}
