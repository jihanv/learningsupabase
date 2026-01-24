export async function submitData(
  _prevState: null | undefined,
  formData: FormData,
) {
  const newDeal = {
    name: formData.get("name"),
    value: formData.get("value"),
  };

  console.log(newDeal);
  //Async operation

  //Return error state

  return null;
}
