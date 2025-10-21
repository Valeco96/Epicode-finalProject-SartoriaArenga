import axios from "./axios.js";

export async function getAllPieces() {
  try {
    const response = await axios.get("/api/portfolio");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createPiece(newPiece, token) {
  try {
    const response = await axios.post(`/api/portfolio`, newPiece, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSinglePiece(id) {
  try {
    const response = await axios.get(`/api/portfolio/${id}`);
    return response.data;
    console.log("Response completa:", response.data);
  } catch (error) {
    console.log("Errore getSinglePiece:", error);
  }
}

export async function editPiece(id, pieceData, token) {
  try {
    const response = await axios.put(`/api/portfolio/${id}`, pieceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Errore editPiece:", error);
    throw error;
  }
}

export async function deletePiece(pieceId, token) {
  try {
    const response = await axios.delete(`/api/portfolio/${pieceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const updateImage = async (id, imageFile, token) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await axios.patch(`/api/portfolio/${id}/image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
