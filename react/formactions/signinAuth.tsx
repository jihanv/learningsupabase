// import supabase from "../src/supabase-client";
type FormState = { message: string } | null;

export async function signInAuth(
    _prevState: FormState | null | undefined,
    formData: FormData,
) {
    const signInInfo = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    console.log(signInInfo);

    return null;
}
