// src/config.js
const config = {
  API_SERVER_HOST: "http://localhost:8080", // 서버 ip
  PREFIX: {
    // 부서 프리픽스
    employee: "hr",
  },
  AUTHORITY: {
    // 권한
    select: "SELECT",
    insert: "INSERT",
    update: "UPDATE",
    delete: "DELETE",
  },
  get PREFIX_AUTHORITY() {
    return {
      employeeSelect: this.PREFIX.employee + this.AUTHORITY.select,
      employeeInsert: this.PREFIX.employee + this.AUTHORITY.insert,
      employeeUpdate: this.PREFIX.employee + this.AUTHORITY.update,
      employeeDelete: this.PREFIX.employee + this.AUTHORITY.delete,
    };
  },
};

export default config;
