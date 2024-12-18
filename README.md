Amennyiben nem szeretné végigolvasni a tanár úr, kérem skippeljen a "FONTOS" részig a szövegben

Végpontok, melyek itthoni tesztelésben működtek:

"/": a főoldal, itt 6 terméket láthatunk, egy bevezető szöveget, melyet a ChatGPT generált.

"/login": bejelentkezés, az adatbázisban meg nem található adatokkal nem enged be.

"/products": a termékek listázása, rendezés lehetséges, 5-10-20 termék megjelenítése oldalanként, keresés, kiírja az oldal, hogy van-e raktáron.

"/protected": sikeres bejelentkezés esetén ide navigál az oldal. Ugyanaz, mint a "/products" oldal, ám itt van megjelenik egy "Kosárba" gomb is, amennyiben a termék raktáron van.
  Amennyiben nincs raktáron a termék, a megjelenő szöveg: Sajnos a termék jelenleg nem áll rendelkezésre.
  
"/logout": ugyan nem kérte a tanár úr, annyit hozzátettem, hogy visszadobjon a login oldalra, ha a kijelentkezésre nyomunk.

"/profile": Elméletileg működik - gyakorlatban sajnos csak tölt...

"/cart": Sajnos a tudásomat meghaladta ez a végpont.



FONTOS:
A feliratozott gombokkal minden végpont elérhető (természetesen egyes oldalak csak bejelentkezés után), így az URL-ben nem szükséges átírogatás.

Teszt adatsor login teszteléséhez:
username: test
password: test
email: test@test.com

Regisztráció után természetesen saját adattal is használható a bejelentkezés.

U.I.: 
  - Sajnos ha beleőszülök, akkor se jövök rá, miért nem működik a "raktáron" rész, mindig false-ot ad vissza, 1 óra alatt nem találtam meg a hibát.
  - A fenti miatt a "/cart" végpont sem tud megvalósulni, nincs hozzá kód megírva.
  - A kijelentkezés nem tökéletes, egyéni próbálkozás, kérem nézze el :(
