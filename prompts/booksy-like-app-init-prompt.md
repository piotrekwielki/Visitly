# Prompt startowy: aplikacja podobna do Booksy

Wykorzystaj ponizszy prompt jako inicjalizacje calego projektu.

```text
Chce zbudowac kompletna aplikacje webowa podobna do Booksy, ale jako osobny produkt i bez kopiowania brandu Booksy. Traktuj notatke z pliku `notes/booksy-how-it-works.md` jako glowny brief produktowy i na jej podstawie zaprojektuj MVP oraz architekture systemu.

Twoja rola:
Dzialasz jak senior staff full-stack engineer, product architect i UX lead. Nie tworz tylko makiet. Masz zaprojektowac i wygenerowac prawdziwy fundament projektu gotowy do dalszego rozwijania.

Cel produktu:
Budujemy marketplace + system do obslugi rezerwacji dla biznesow uslugowych, np. beauty, wellness, barber, nails, brows, massage, tattoo, fizjo, konsultacje i inne uslugi umawiane na godziny.

Stack technologiczny:
- Frontend i backend aplikacyjny: Next.js z App Router, TypeScript
- UI: Tailwind CSS + shadcn/ui
- Baza danych, auth, storage i realtime: Supabase
- Hosting i deployment: Vercel
- Walidacja formularzy: Zod
- Formularze: React Hook Form
- Tabela danych: TanStack Table jesli potrzebna
- Kalendarz i date handling: wybierz dojrzale biblioteki, ale zachowaj prostote

Wazne zalozenia:
- Projekt ma byc od poczatku przygotowany pod wdrozenie na Vercelu.
- Dane maja byc modelowane w Supabase z poprawnym multi-tenancy i RLS.
- Architektura ma wspierac dwa glowne obszary:
  1. Aplikacje klienta koncowego
  2. Panel biznesowy do zarzadzania rezerwacjami
- Nie integruj na starcie prawdziwego operatora platnosci, ale przygotuj architekture pod pozniejsze podpiecie. Na MVP zastosuj warstwe payment abstraction i placeholder flow dla depozytow / no-show / statusow platnosci.

Glowni uzytkownicy i role:
- goscie
- klienci
- wlasciciel biznesu
- pracownik / specjalista
- administrator platformy

Najwazniejsze funkcje MVP:

1. Marketplace / discovery
- lista biznesow
- wyszukiwarka i filtrowanie po kategorii, lokalizacji i nazwie
- karta biznesu z opisem, uslugami, cennikiem, opiniami, zespolami i galeria
- profil specjalisty

2. Rezerwacje klienta
- rejestracja i logowanie przez Supabase Auth
- przegladanie dostepnych terminow
- tworzenie rezerwacji
- zmiana terminu i anulowanie w ramach zasad biznesu
- historia wizyt
- wystawianie opinii po zakonczonej wizycie

3. Panel biznesowy
- onboarding biznesu
- tworzenie profilu firmy
- zarzadzanie lokalizacjami
- zarzadzanie specjalistami
- zarzadzanie uslugami i czasem trwania
- ustawianie godzin pracy i przerw
- ustawianie regul rezerwacji:
  - automatyczna lub reczna akceptacja
  - minimalne i maksymalne wyprzedzenie rezerwacji
  - zasady anulowania
  - blokowanie klientow
- widok kalendarza dziennego i tygodniowego
- lista klientow i podstawowy CRM

4. Operacje i komunikacja
- statusy rezerwacji
- przypomnienia i powiadomienia jako architektura gotowa do rozbudowy
- event log / audit trail dla kluczowych akcji

5. Platnosci i no-show readiness
- model danych dla platnosci, depozytow, charge attempts i cancellation fees
- statusy platnosci i placeholder endpoints
- bez realnej integracji operatora, ale z czytelnymi interfejsami do przyszlego podpiecia

6. Admin platformy
- podglad biznesow
- podglad uzytkownikow
- podstawowe flagi moderacyjne

Wymagania architektoniczne:
- Uzyj Next.js App Router.
- Rozdziel warstwy: UI, server actions / route handlers, data access, domain logic.
- Wykorzystaj Supabase SSR auth patterns odpowiednie dla Next.js.
- Zaprojektuj baze w modelu multi-tenant:
  - profiles
  - businesses
  - business_members
  - locations
  - staff
  - services
  - business_hours
  - availability_exceptions
  - clients
  - client_blocks
  - bookings
  - booking_status_history
  - reviews
  - payment_intents
  - deposits
  - notifications
- Dodaj sensowne klucze obce, indeksy i unikalne ograniczenia.
- Dodaj RLS policies dla kazdej glownej tabeli.
- Uzyj timestamptz i poprawnej obslugi timezone.

Wymagania UX/UI:
- Interfejs ma wygladac jak nowoczesny produkt SaaS + marketplace.
- Nie tworz generycznego "AI slop" layoutu.
- Strona ma byc responsywna i dopracowana na mobile i desktop.
- Zadbaj o czytelny przeplyw rezerwacji.
- Zachowaj osobny UX dla klienta i osobny dla panelu biznesowego.

Wymagania implementacyjne:
- Wygeneruj strukture folderow gotowa do pracy produkcyjnej.
- Dodaj README z instrukcja lokalnego uruchomienia, konfiguracji Supabase i deployu na Vercel.
- Dodaj `.env.example`.
- Przygotuj migracje SQL dla Supabase.
- Dodaj seedy lub dane demo.
- Dodaj podstawowe testy dla najwazniejszych flow lub warstw domenowych, jesli uznasz to za zasadne.
- Tam gdzie pelna funkcjonalnosc nie miesci sie w MVP, zostaw TODO i czytelne rozszerzalne interfejsy.

Oczekiwany sposob pracy:
1. Najpierw zaproponuj architekture i zakres MVP.
2. Nastepnie wygeneruj strukture projektu.
3. Potem wygeneruj model danych, migracje i RLS.
4. Potem przygotuj glowne widoki i kluczowe flow.
5. Na koncu uzupelnij README i checklisty uruchomienia.

Format odpowiedzi:
- Najpierw pokaz krotki plan.
- Potem wypisz strukture projektu.
- Potem pokaz najwazniejsze pliki i ich zawartosc.
- Jesli czegos nie implementujesz w pierwszym kroku, napisz to jawnie jako "out of scope for MVP".

Najwazniejsze zasady:
- Nie buduj tylko landing page.
- Nie upraszczaj produktu do zwyklego formularza rezerwacji.
- Mysl o tym jak o fundamencie pod prawdziwy startup.
- Kod ma byc czytelny, nowoczesny i skalowalny.
- Decyzje techniczne uzasadniaj tam, gdzie maja znaczenie.

Zacznij od zaproponowania architektury calego systemu, modelu danych i planu realizacji MVP.
```
