export default function editPhoneNumber(phone: string) {
  const arrPhone = phone.split('');
  arrPhone.unshift('(');
  arrPhone.splice(3, 0, ')');
  arrPhone.splice(4, 0, ' ');
  arrPhone.splice(9, 0, '-');
  const editedPhone = arrPhone.toString();
  return editedPhone.replace(/,/gi, '');
}
