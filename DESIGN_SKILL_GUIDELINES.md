# TIÊU CHUẨN THIẾT KẾ UI/UX Y TẾ QUỐC TẾ (INTERNATIONAL HEALTHCARE DESIGN SKILL)
## Phiên bản: 2.0 — Chuẩn mực Editorial Healthcare & Human-Centered Patient Experience
**Dự án:** ALIVIA International Hospital  
**Khái niệm chủ đạo:** *"ALIVIA — A More Human Standard of Care"*

---

## 1. TÔN CHỈ & VAI TRÒ CHUYÊN MÔN (ROLE & CORE ETHOS)
- **Vai trò:** Principal UI/UX Designer, Creative Director, Design Systems Architect và Healthcare Digital Experience Specialist.
- **Nguyên tắc cốt lõi:** **THIẾT KẾ ĐI TRƯỚC, VIẾT CODE THEO SAU (DESIGN FIRST, CODE SECOND).**
- **Định vị trải nghiệm:** Sánh ngang các hệ thống y tế danh tiếng toàn cầu (*Mayo Clinic, Cleveland Clinic, Mount Elizabeth Singapore, Bumrungrad International, Charité Berlin*).
- **Tâm lý học y tế (Medical Empathy):** Người bệnh tìm đến website bệnh viện thường trong trạng thái lo lắng, băn khoăn hoặc cần giải pháp cho các ca bệnh khó. Giao diện phải mang lại cảm giác **An tâm (Clinical Calm) — Đáng tin cậy (Authoritative Trust) — Thấu cảm (Humanity) — Tiện lợi vượt trội (Frictionless Access)**.
- **Triết lý "Quiet Luxury in Healthcare":** Sự cao cấp trong y tế không nằm ở sự phô trương, hiệu ứng bóng bẩy hay từ ngữ giật gân; nó toát lên từ **sự điềm đạm, không gian thở rộng rãi, typography hoàn mỹ, hình ảnh chân thực và tính minh bạch tuyệt đối**.

---

## 2. NGUYÊN TẮC THIẾT KẾ QUỐC TẾ (INTERNATIONAL DESIGN PILLARS)

### 2.1 Bố cục Báo chí Y khoa Cao cấp (Editorial Layout)
- **Khoảng thở hào phóng (Generous Whitespace):** Padding các phân đoạn lớn từ `96px` đến `140px` (Desktop). Khoảng trắng y tế giúp hạ nhịp tim thị giác, giảm áp lực tâm lý và tăng cường khả năng tiếp nhận thông tin điều trị.
- **Bất đối xứng có chủ đích (Intentional Asymmetry):** Kết hợp nhịp điệu giữa các cột tỷ lệ vàng (ví dụ `1.35fr : 1fr`, `1.2fr : 0.8fr`) thay vì lặp lại các lưới 3 cột hay 4 thẻ đều đặn rập khuôn.
- **Trích dẫn chuyên môn (Editorial Pull Quotes):** Sử dụng các câu trích dẫn kích thước lớn bằng phông Serif in nghiêng của Giám đốc Y khoa hoặc Bác sĩ trưởng khoa, đóng khung bằng đường kẻ viền hairline mạ đồng để khẳng định cam kết y đức.
- **Đường nét kiến trúc thanh mảnh (Architectural Hairlines):** Dùng các đường chia tách mảnh `1px` (`#E3DFD7`) để phân vùng nội dung thay vì đóng hộp tất cả vào các thẻ card viền thô.

### 2.2 Nghệ thuật Hình ảnh "Healing Hospitality" (Biophilic & Empathic Art Direction)
- **Không gian chữa lành (Healing Environment):** Ưu tiên hình ảnh kiến trúc ngập tràn ánh sáng ban ngày tự nhiên, cây xanh (Biophilic design), phòng bệnh kính tràn viền view sông/công viên chuẩn khách sạn 5 sao. Xóa bỏ định kiến về không gian bệnh viện ngột ngạt, tối tăm.
- **Ánh mắt kết nối (Direct Eye Contact & Warmth):** Ảnh chân dung bác sĩ phải toát lên sự đĩnh đạc, ánh mắt ấm áp nhìn thẳng vào ống kính, thể hiện sự lắng nghe và cam kết đồng hành cùng người bệnh.
- **Công nghệ đích thực (Authentic Clinical Technology):** Minh bạch hình ảnh thực tế của hệ thống máy chụp cộng hưởng từ MRI 3.0T, phòng mổ thông minh Hybrid OR vô trùng áp lực dương, hệ thống nội soi huỳnh quang.
- **Cấm tiệt:** Ảnh stock tạo dáng gượng gạo, nụ cười công nghiệp giả tạo, hình ảnh vết mổ ghê rợn hoặc các biểu tượng trang trí vô nghĩa.

---

## 3. HỆ THỐNG DESIGN TOKENS CHUẨN Y TẾ TOÀN CẦU

### 3.1 Bảng màu Đẳng cấp (Refined Palette)
| Tên Token | Mã HEX | Vai trò & Ý nghĩa |
| :--- | :--- | :--- |
| `--color-ink` | `#0E1E2E` / `#142F43` | Màu Navy sẫm quyền uy, dùng cho tiêu đề chính, nút bấm chủ đạo và header |
| `--color-canvas` | `#FAF9F5` | Nền màu ngà ấm / thạch cao (Warm Ivory), giảm chói mắt và tạo cảm giác ấn phẩm báo chí |
| `--color-canvas-alt` | `#F4F3EE` | Màu nền phân đoạn thứ cấp, tách biệt các khối chức năng êm dịu |
| `--color-surface` | `#FFFFFF` | Trắng tinh khiết cho bề mặt biểu mẫu đặt lịch, thẻ chuyên gia, modal |
| `--color-blue-medical`| `#1A5F96` | Xanh dương chính xác y khoa (Precision Blue) cho các liên kết và điểm nhấn điều hướng |
| `--color-gold-champagne`| `#B68B62` / `#A48650`| Vàng đồng ánh kim mờ, bảo chứng cho tiêu chuẩn quốc tế JCI và dịch vụ VIP Suite |
| `--color-border` | `#E3DFD7` | Đường kẻ hairline kiến trúc thanh mảnh, tinh tế, sang trọng |
| `--color-emergency` | `#C22929` | Đỏ cấp cứu khẩn cấp 24/7, luôn tách biệt hoàn toàn với nút đặt lịch thường |
| `--color-charcoal` | `#253646` | Màu chữ đọc nội dung chính, tương phản cao đạt chuẩn WCAG 2.2 AA |
| `--color-slate` | `#5A6B7C` | Màu chữ phụ, mô tả dịch vụ, chú thích y khoa và hướng dẫn |

### 3.2 Kiểu chữ Cặp đôi Tạp chí Y học (Editorial Typography Pairing)
- **Serif Display (Tiêu đề danh giá & Trích dẫn):** `Playfair Display` (font serif cổ điển, kiêu hãnh, uy tín y học hàn lâm).
  - Sử dụng cho: Tiêu đề Hero, H2 phân đoạn chính, Pull Quotes, Tiêu đề Gói khám VIP Platinum.
- **Humanist Sans-serif (Nội dung & Biểu mẫu):** `Be Vietnam Pro` (thiết kế tối ưu cho tiếng Việt, hiển thị dấu thanh chuẩn xác, không bị lỗi dính dấu, độ cao x-height lớn giúp người lớn tuổi đọc rõ ràng).
  - Sử dụng cho: Thanh điều hướng, Thẻ bác sĩ, Biểu mẫu đặt lịch, Bảng giá khám, Chú thích y khoa.

### 3.3 Thang tỷ lệ Kiểu chữ (Type Scale)
- **Hero Title:** `clamp(2.35rem, 4vw, 3.4rem)` — Line-height: `1.16` — Letter-spacing: `-0.025em`.
- **Section Heading:** `clamp(2rem, 3.2vw, 2.625rem)` — Line-height: `1.25` — Letter-spacing: `-0.015em`.
- **Card / Doctor Title:** `1.25rem - 1.45rem` — Line-height: `1.35`.
- **Body Text:** `1rem - 1.0625rem` — Line-height: `1.65` (đảm bảo độ thoáng tối đa).
- **Kickers / Eyebrow:** `0.75rem - 0.8125rem` — Font-weight: `700` — Letter-spacing: `0.1em` — Uppercase.

---

## 4. TÍNH NĂNG ĐẶC THÙ CỦA BỆNH VIỆN QUỐC TẾ (SIGNATURE FEATURES)

Website y tế quốc tế phải vượt qua giới hạn của một trang giới thiệu thông thường bằng các tính năng phục vụ nhu cầu điều trị thực tế:

### 4.1 Dịch vụ Ý kiến Y khoa Thứ hai (Second Opinion Concierge)
- **Mục đích:** Hỗ trợ người bệnh mắc bệnh lý phức tạp (Ung thư, Tim mạch can thiệp, Bệnh cột sống thoái hóa nặng) đã khám ở bệnh viện khác có cơ hội được hội đồng chuyên gia quốc tế Alivia (Heart Team / Tumor Board) thẩm định lại phác đồ trước khi đưa ra quyết định phẫu thuật.
- **Trải nghiệm:** Khối chuyên biệt cho phép chọn chuyên gia, tải tóm tắt bệnh án, kết quả sinh thiết, file ảnh chụp DICOM (MRI/CT).

### 4.2 Chuyển đổi Hình thức Khám (Dual Care Mode: In-Person vs Telehealth)
- Cung cấp lựa chọn rõ ràng:
  - **Khám trực tiếp tại Bệnh viện (Campus Sala):** Tiếp đón tại sảnh, khám cận lâm sàng kỹ thuật cao.
  - **Tư vấn Từ xa qua Video (Telehealth Consultation):** Dành cho người bệnh ở tỉnh xa, kiều bào nước ngoài hoặc tái khám định kỳ nhận tư vấn kết quả xét nghiệm.

### 4.3 Công cụ Định hướng Triệu chứng (Symptom/Concern Guided Navigator)
- Người bệnh không cần phải am hiểu danh pháp y khoa; họ có thể tìm theo triệu chứng thông thường (Ví dụ: *"Đau thắt ngực khi gắng sức"*, *"Tê bì nửa người"*, *"Mất ngủ kinh niên"*).
- Hệ thống tự động gợi ý đúng chuyên khoa sâu và đúng Giáo sư/Tiến sĩ có chuyên môn phù hợp nhất, triệt tiêu tình trạng bệnh nhân khám nhầm chuyên khoa.

### 4.4 Tra cứu Bảo lãnh Bảo hiểm Tư nhân Nhanh (Insurance Pre-Authorization Check)
- Tích hợp bộ lọc 40+ hãng bảo hiểm đối tác (*Bảo Việt, Liberty, Insmart, Pacific Cross, Bupa, Cigna, Allianz, Generali...*).
- Cho phép người bệnh chọn công ty bảo hiểm và hiển thị ngay cam kết: *"Thẻ bảo hiểm của bạn được bảo lãnh viện phí trực tiếp 100% tại quầy thu ngân Alivia mà không cần thanh toán trước"*.

### 4.5 Khu Dịch vụ Bệnh nhân Quốc tế & Kiều bào (International Patient Lounge)
- Cung cấp gói dịch vụ chuyên biệt: Đưa đón sân bay Tân Sơn Nhất, Đội ngũ thông dịch viên y khoa (Anh, Pháp, Nhật, Hoa), Hỗ trợ thủ tục gia hạn thị thực y tế (Medical Visa Extension).

---

## 5. QUY CHUẨN TRẢI NGHIỆM ĐẶT LỊCH KHÁM (HEALTHCARE SCHEDULING UX)

Biểu mẫu đặt hẹn là **trọng tâm chuyển đổi số (Conversion Centerpiece)** của bệnh viện:

1. **Phân nhóm thông tin 4 bước mạch lạc (Grouped Fieldsets):**
   - **Bước 1 — Thông tin người khám:** Họ và tên, Số điện thoại di động Việt Nam (Regex chuẩn `03x, 05x, 07x, 08x, 09x` đủ 10 số), Email nhận bệnh án.
   - **Bước 2 — Nhu cầu y tế:** Chọn chuyên khoa sâu, Bác sĩ mong muốn (tuỳ chọn), Hình thức khám (Trực tiếp hoặc Telehealth).
   - **Bước 3 — Lịch hẹn & Khung giờ:** Ngày khám (khóa các ngày trong quá khứ, tối thiểu từ ngày mai), Khung giờ phân đoạn dạng segmented chips:
     - Sáng: 08:00 – 11:30
     - Chiều: 13:30 – 16:30
     - Ngoài giờ: 17:00 – 19:30
   - **Bước 4 — Triệu chứng & Cam kết bảo mật:** Mô tả triệu chứng, tích chọn đồng thuận bảo mật dữ liệu y tế cá nhân theo Nghị định 13/2023/NĐ-CP.
2. **Cam kết dịch vụ minh bạch:**
   - *"Thư ký Y khoa chuyên trách sẽ liên hệ lại qua điện thoại trong vòng 15 phút để xác nhận lịch hẹn và dặn dò quy trình chuẩn bị xét nghiệm."*
3. **Phiếu tiếp nhận hẹn khám (Confirmation Receipt Modal):**
   - Sau khi bấm xác nhận, hiển thị trạng thái loading spinner chuyên nghiệp.
   - Mở modal xác nhận với **Mã định danh biên nhận duy nhất dạng `ALV-XXXXXX`**.
   - Tóm tắt đầy đủ: Họ tên, Số điện thoại, Chuyên khoa/Bác sĩ, Ngày giờ khám, Hướng dẫn đỗ xe và số hotline cấp cứu hỗ trợ khi cần dời lịch.
4. **Tiếp cận Đa điểm (Omnipresent Booking Entrypoints):**
   - Nút đặt lịch ở Header & Mobile Drawer.
   - Thẻ hành động tại Patient Intent Selector.
   - Nút đặt hẹn riêng cho từng Bác sĩ và từng Chuyên khoa.
   - Nút đăng ký riêng cho từng Gói khám sức khỏe.
   - Thanh Dock nổi (Floating Dock) trên desktop và Mobile Sticky Bar dính đáy màn hình điện thoại.

---

## 6. DANH SÁCH CHỐNG MẪU THIẾT KẾ (ANTI-PATTERNS — CẤM KỴ)

- ❌ **Cấm giao diện thương mại điện tử giá rẻ:** Không dùng đồng hồ đếm ngược (countdown timer), huy hiệu giảm giá giật gân, flash sale khám bệnh.
- ❌ **Cấm AI-Generated clichés:** Không dùng các khối bo tròn quả trứng, không dùng hiệu ứng viền phát sáng (neon glow), không dùng gradient tím-xanh công nghệ chung chung.
- ❌ **Cấm lặp lại lưới 3 cột vô tận:** Không thiết kế trang web bằng cách xếp chồng các hàng 3 card giống hệt nhau từ đầu đến cuối trang.
- ❌ **Cấm nội dung giả mạo:** Không tự chế các giải thưởng không có thật, chứng nhận không kiểm chứng, đánh giá 5 sao bịa đặt.
- ❌ **Cấm che khuất thông tin khẩn cấp:** Số Hotline cấp cứu 24/7 (`1900 6868`) phải luôn dễ nhìn, không bị che bởi các nút chatbot hay thanh nổi.
- ❌ **Cấm gượng ép chuyển động (No Motion Showcase):** Tuyệt đối không dùng hiệu ứng cuộn giật màn hình (scroll hijacking), xoay lộn xộn gây chóng mặt cho người lớn tuổi. Chuyển động phải êm ái, lịch thiệp (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 7. BẢNG KIỂM TRA THIẾT KẾ ĐẦU RA (DEFINITION OF EXCELLENCE)

Mỗi lần triển khai hoặc nâng cấp giao diện, phải đối soát nghiêm ngặt theo bảng kiểm tra 7 điểm:

- [ ] **1. Cảm xúc thương hiệu (Brand Perception):** Website toát lên đẳng cấp của một bệnh viện quốc tế JCI: điềm đạm, nhân văn, trang nghiêm và đáng tin cậy.
- [ ] **2. Tính nhất quán của Design System:** Tuân thủ 100% bảng màu Deep Navy, Warm Ivory, Muted Brass và cặp phông Playfair Display + Be Vietnam Pro.
- [ ] **3. Tính toàn vẹn của Dữ liệu Y khoa:** Tên chuyên gia, học vị, chuyên khoa, thông số MRI/Phòng mổ và thông tin liên hệ chính xác, thực tế.
- [ ] **4. Khả năng truy cập WCAG 2.2 AA:** Độ tương phản chữ và nền vượt 4.5:1, hiển thị rõ ràng đường viền focus khi dùng phím Tab, phông chữ to rõ dễ đọc cho người cao tuổi.
- [ ] **5. Tương tác Chuyển đổi Khám bệnh:** Luồng đặt hẹn 4 bước hoạt động trơn tru, kiểm tra đúng số điện thoại di động Việt Nam, hiển thị mã biên nhận `ALV-XXXXXX`.
- [ ] **6. Khả năng tương thích Thiết bị (Responsiveness):** Hiển thị hoàn mỹ trên Desktop (1440px), Laptop (1024px), Tablet (768px) và Smartphone (375px - 390px) với thanh đặt lịch cố định đáy.
- [ ] **7. Tốc độ & Tối ưu kỹ thuật:** Tải trang nhanh, ảnh nén tối ưu, không có layout shift (CLS = 0), code sạch sẽ, không có console error.
