import getApi from "./api";

export async function updateProfileImage({ file }: { file: File }) {
  const formData = new FormData();
  formData.append("student_passprt", file);

  const response = await getApi().post("/student_upload_passport", formData);

  if (!response.data.status) {
    throw new Error(response.data.message);
  }

  return;
}

export async function updateProfile({
  alternativeEmail,
  phone,
}: {
  alternativeEmail?: string;
  phone?: string;
}) {
  const data: Record<string, string> = {};

  if (alternativeEmail) data.alternative_mail = alternativeEmail;
  if (phone) data.phone = phone;

  const response = await getApi().post("/profile", data);

  if (!response.data.status) {
    throw new Error(response.data.message);
  }

  return;
}
