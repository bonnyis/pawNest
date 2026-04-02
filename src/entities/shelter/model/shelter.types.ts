export interface ShelfterListRequest {
  type: "xml" | "json";
  pIndex: number;
  pSize: number;
  key: string;
  SIGUN_NM?: string;
  SIGUN_CD?: string;
  SUM_YY?: string;
}

export interface ShelterItem {
  SUM_YY: string; // 집계년도
  SIGUN_NM: string; // 시군명
  SIGUN_CD: string; // 시군코드
  ENTRPS_NM: string; // 업체명
  REPRSNTV_NM: string; // 대표자명
  ACEPTNC_ABLTY_CNT: number; // 수용능력수
  ENTRPS_TELNO: string; // 업체전화번호
  CONTRACT_PERD: string; // 계약기간
  CORPR_ANIMAL_HOSPTL_DTLS: string | null; // 협력동물병원내역
  RM_MATR: string | null; // 비고사항
  REFINE_LOTNO_ADDR: string; // 소재지지번주소
  REFINE_ROADNM_ADDR: string; // 소재지도로명주소
  REFINE_ZIP_CD: string; // 소재지우편번호
  REFINE_WGS84_LOGT: string; // WGS84 경도
  REFINE_WGS84_LAT: string; // WGS84 위도
}

export interface ShelterApiResponse {
  OrganicAnimalProtectionFacilit: [
    {
      head: [
        { list_total_count: number },
        { RESULT: { CODE: string; MESSAGE: string } },
        { api_version: string },
      ];
    },
    {
      row: ShelterItem[];
    },
  ];
}
