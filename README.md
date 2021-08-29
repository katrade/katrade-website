# Katrade Frontend

### อย่าลืมว่าทุกๆครั้งที่ทำให้ `git checkout frontend` เพื่อไปทำงานบน branch `frontend` ก่อน ป้องกันงานไปกวนส่วนอื่น

## เริ่มต้น
ใครที่ยังไม่เคยทำงานบน repo นี้มาก่อนให้ทำตามนี้
- เปิด Terminal , CMD , WSL แล้วแต่สะดวก
- สร้าง folder เปล่าๆขึ้นมา แล้ว `cd` เข้าไป เช่น `mkdir katrade-frontend` แล้ว `cd katrade-frontend`
- พิมพ์ `git init`
- พิมพ์ `git remote add origin https://github.com/NUTPEDTeam/katrade.git`
- หลังจากนั้น **หากต้องการทำงาน frontend** พิมพ์ `git pull origin`
- git จะดึงไฟล์ต่างๆมาลงในเครื่องเรา
- จะเห็นได้ว่ามี 3 folder ถูก load เข้ามา ให้ `cd frontend` เพื่อเข้าไปที่ folder frontend
- จากนั้นสามารถใช้ `code .` เพื่อเปิด vscode ที่ project นั้นได้เลย ใครใช้ command นี้ไม่ได้ก็เปิด vscode แล้ว file > open folder แล้วเลือก **frontend** เท่านั้น อย่าออกไปที่ directory หลัก
- หมายความว่าตอนนี้ vscode ควรจะอยู่ที่ `/frontend` ไม่ใช่ `/` เช็คง่ายๆหากมี folder `public` `src` และไฟล์ `package.json` อยู่บน vscode แล้วแปลว่า คุณมาถูกทางแล้ว
- กลับไปที่ terminal ของเรา ใช้คำสั้ง `npm install` เพื่อโหลดไฟล์ทุก library ของ React project ของเรา
- ถ้าบน vscode มี folder `node_modules` เพิ่มเข้ามา หมายความว่าตอนนี้ project ของเราพร้อมที่จะรันได้แล้ว ขั้นตอนต่อไปก็แค่ RUN!!
- ใช้คำสั้ง `npm start` เพื่อรัน React โดยปกติมันจะเปิด browser แล้วเข้า web เราให้เอง แต่ถ้าไม่ขึ้น ให้เข้า browser อะไรก็ได้แล้วพิมพ์ http://localhost:3000 จะต้องเจอกับหน้าหลักของ project
- เข้าไปอ่านวิธีการทำและมาตรฐานของการทำ project เพื่อให้ง่ายต่อการทำงานร่วมกันนะครับ
