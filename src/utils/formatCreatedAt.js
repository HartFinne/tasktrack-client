const formatCreatedAt = (createdAt) => {
  if (!createdAt) return "—";

  // Firestore Timestamp object
  if (typeof createdAt.toDate === "function") {
    return createdAt.toDate().toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Serialized Firestore timestamp
  if (createdAt._seconds) {
    return new Date(createdAt._seconds * 1000).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // ISO string or number
  return new Date(createdAt).toLocaleDateString("en-PH");
};


export default formatCreatedAt