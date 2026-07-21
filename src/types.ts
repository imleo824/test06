export interface ReportConfig {
  brandMark: string;
  navTitle: string;
  reportTitle: string;
  pageTitle: string;
  printHeaderLeft: string;
  confidentiality: string;
  reportDateLabel: string;
  reportDate: string;
  pdfFileName: string;
  pdfBackgroundColor: string;
}

export const FA: ReportConfig = {
  brandMark: "",
  navTitle: "SJB",
  reportTitle: "FKSJBBG",
  pageTitle: "FKSJBBG",
  printHeaderLeft: "SJB工作总结",
  confidentiality: "内部机密",
  reportDateLabel: "汇报日期",
  reportDate: "2026.07",
  pdfFileName: "FKSJBBG_202607.pdf",
  pdfBackgroundColor: "#FFFFFF",
};
