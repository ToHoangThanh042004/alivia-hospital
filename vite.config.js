import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        chuyenKhoa: resolve(import.meta.dirname, 'chuyen-khoa/index.html'),
        chuyenKhoaTimMach: resolve(import.meta.dirname, 'chuyen-khoa/tim-mach/index.html'),
        doiNguBacSi: resolve(import.meta.dirname, 'doi-ngu-bac-si/index.html'),
        bacSiTranVanMinh: resolve(import.meta.dirname, 'bac-si/tran-van-minh/index.html'),
        datLichKham: resolve(import.meta.dirname, 'dat-lich-kham/index.html'),
        gocSucKhoe: resolve(import.meta.dirname, 'goc-suc-khoe/index.html'),
        gocSucKhoeTamSoat: resolve(import.meta.dirname, 'goc-suc-khoe/tam-soat-tim-mach/index.html'),
        veAlivia: resolve(import.meta.dirname, 've-alivia/index.html'),
        huongDanKham: resolve(import.meta.dirname, 'huong-dan-kham/index.html'),
        lienHe: resolve(import.meta.dirname, 'lien-he/index.html'),
      },
    },
  },
});
