// צבעי עדיפות וקטגוריה, במקום אחד.
export const PRIORITY = {
  urgent: { bg: "#FCEBEB", text: "#791F1F", border: "#F09595", label: "דחוף" },
  important: { bg: "#FAEEDA", text: "#633806", border: "#FAC775", label: "חשוב" },
  significant: { bg: "#E6F1FB", text: "#0C447C", border: "#85B7EB", label: "משמעותי" },
  negligible: { bg: "#F1EFE8", text: "#444441", border: "#D3D1C7", label: "לידיעה" },
};

export const CATEGORY = {
  config: { bg: "#F1EFE8", text: "#444441", label: "קונפיגורציה" },
  received: { bg: "#EAF3DE", text: "#27500A", label: "התקבל" },
  calculated: { bg: "#E6F1FB", text: "#0C447C", label: "מחושב" },
  deducted: { bg: "#FCEBEB", text: "#791F1F", label: "הופחת" },
  employer: { bg: "#EEEDFE", text: "#3C3489", label: "הפרשת מעסיק" },
};
