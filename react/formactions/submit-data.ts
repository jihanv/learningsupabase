import supabase from "../src/supabase-client";
type FormState = { message: string } | null;

export async function submitData(
  _prevState: FormState | null | undefined,
  formData: FormData,
) {
  const newDeal = {
    name: formData.get("name"),
    value: formData.get("value"),
  };

  console.log(newDeal);
  //Async operation
  const { error } = await supabase.from("sales_deals").insert({
    name: newDeal.name,
    value: newDeal.value,
  });
  if (error) {
    console.log(error);
    return { message: `There is an error ${error}` };
  }
  //Return error state

  return null;
}
