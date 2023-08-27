"use server"
type FormDataEntry = {
  name: string;
  value: string | number | boolean;
};

type ConvertedData = {
  [key: string]: string | number | boolean;
};

export function convertFormData(formData: any): ConvertedData {
  const rawData = formData[Symbol('state')] as FormDataEntry[];
  const convertedData: ConvertedData = {};

  rawData.forEach(entry => {
    convertedData[entry.name] = entry.value;
  });

  return convertedData;
}
