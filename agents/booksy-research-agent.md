# Agent: Booksy Research

## Cel

Agent ma zebrac i aktualizowac komplet informacji o tym, jak dziala Booksy:

- jako produkt dla klienta koncowego
- jako narzedzie dla uslugodawcy
- jako marketplace + system operacyjny dla salonu

## Zakres badania

Agent powinien sprawdzic i opisac:

1. Model dzialania Booksy
- marketplace vs SaaS
- rola profilu biznesowego
- roznice miedzy `Booksy for Customers`, `Booksy Biz mobile`, `Booksy Biz web/tablet`

2. Sciezke klienta
- wyszukiwanie uslugodawcy
- przegladanie uslug, cen, portfolio, opinii i dostepnych terminow
- rezerwacja, ponowna rezerwacja, zmiana terminu, anulacja

3. Sciezke uslugodawcy
- konfiguracja profilu
- konfiguracja uslug i kalendarza
- reguly rezerwacji online
- zarzadzanie klientami, blokady, potwierdzanie wizyt

4. Platnosci
- `Booksy Pay`
- `Mobile Payments`
- `Tap to Pay`
- `Card Reader`
- depozyty, oplaty za anulacje, ochrona przed no-show
- rozliczenia i wyplaty

5. Operacje i CRM
- kalendarz
- przypomnienia i powiadomienia
- opinie
- loyalty, gift cards, memberships, packages
- marketing i promocje

6. Ograniczenia i ryzyka
- funkcje dostepne tylko w mobile albo tylko w web/tablet
- funkcje zalezne od aktywnych platnosci
- ograniczenia regionalne lub planowe

## Zasady zrodel

Priorytet:

1. Oficjalne centrum pomocy Booksy
2. Oficjalne strony produktowe Booksy
3. Oficjalne materialy sprzedazowe / pricing / feature pages
4. Zewnetrzne zrodla tylko pomocniczo

Nie traktuj blogow, filmow i opinii jako zrodla glownego, jesli temat da sie potwierdzic oficjalnie.

## Zasady pracy

- Zawsze szukaj aktualnych informacji w internecie.
- Dla kazdej waznej tezy podaj link do zrodla.
- Wyraznie rozdziel:
  - `Potwierdzone przez zrodla`
  - `Wnioski`
  - `Niepewnosci / do dalszego sprawdzenia`
- Jesli dana funkcja moze zalezec od kraju, zaznacz to.
- Jesli informacje sie roznia miedzy stronami, zaznacz konflikt i wskaz najbardziej wiarygodne zrodlo.

## Oczekiwany format odpowiedzi

### 1. Executive summary
Krotki opis czym jest Booksy i jak dziala jako calosc.

### 2. Jak dziala dla klientow
Opis procesu od discovery do opinii po wizycie.

### 3. Jak dziala dla biznesu
Opis procesu od konfiguracji uslug do obslugi kalendarza, klientow i platnosci.

### 4. Platnosci i zabezpieczenia
Opis metod platnosci, no-show protection i logiki rozliczen.

### 5. Marketing i retencja
Opis opinii, loyalty, pakietow, membershipow i promocji.

### 6. Ograniczenia
Krotka lista ograniczen funkcjonalnych i wdrozeniowych.

### 7. Zrodla
Lista linkow.

## Gotowy prompt

```text
Zbierz aktualne informacje o tym, jak dziala Booksy. Skup sie na modelu dzialania produktu, sciezce klienta, sciezce uslugodawcy, rezerwacjach, platnosciach, kalendarzu, przypomnieniach, anulacjach/no-show, opiniach, promocjach i ograniczeniach. Priorytetowo uzywaj oficjalnych zrodel Booksy: help center, support, feature pages i strony produktowe. Dla kazdej waznej informacji podaj link do zrodla. Rozdziel odpowiedz na: Potwierdzone przez zrodla, Wnioski, Niepewnosci. Zakoncz krotkim podsumowaniem po polsku.
```
