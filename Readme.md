### 📒Документація проекту "Eatly"

:globe_with_meridians: Проект розміщено на платформі [Netlify](https://eatly-fe17.netlify.app/).
:email: E-mail: <info@eatly.com>

---

### *Короткий огляд проекту та його цілі*

---
**Проект "Eatly"** - це шлях до неймовірних кулінарних вражень, де кожен може замовити улюблену їжу з різноманітних ресторанів просто в один дотик. Зручність, різноманіття та швидкість - це три складові, які роблять наш додаток ідеальним вибором для тих, хто цінує витончений смак та комфорт в кожному замовленні.

### *Вимоги*

---

* #### *Функціональні вимоги, реалізовані в додатку*

  * Користувачі мають можливість зареєструватися (створити обліковий запис), авторизуватися як за формою наданою додатком так і використовуючи Google-авторизацію і слідкувати за улюбленими стравами. Створити замовлення може як авторизований так і неавторизований користувач. Реалізована можливість відновлення паролю шляхом надсилання тимчасового посилання, що веде на форму введення нового паролю.
  * Авторизований користувач має можливість додавати обрані страви в список улюблених, щоб зручно слідкувати за ними та швидко знаходити під час подальших замовлень.
  * Доступний пошук як в розрізі ресторанів-партнерів, так і в розрізі пропонованих страв.
  * Фільтрація страв доступна користувачу за категорією, вартістю, рейтингом, популярністю.
  * Користувач може з легкістю відсортувати страви за обраним параметром.
  * Реалізований міні-кошик, що дозволяє користувачу слідкувати за своїм замовленням, не покидаючи сторінку з вибраними фільтрами, a це, в свою чергу, дозволяє економити час користувача і створює найсприятливіші умови для комфортного і якісного замовлення.
  * Користувач може самостійно обирати спосіб оплати замовлення.
  * Сповіщення з описом замовлення, сумою, орієнтовним часом доставки та можливістю зворотнього зв'язку надходить на e-mail користувача в максимально приємному і дружньому форматі.
  * В Додатку реалізовано підтримку користувачів у формі зворотнього листування.
  * Авторизований користувач має можливість залишити відгук про сервіс з оцінкою. Кожен користувач додатку має можливість переглянути усі відгуки в хронологічному порядку починаючи від найновіших.
  * При реєстрації, авторизації, оформленні замовлення, додаванні товару в корзину, при успішному додаванні відгуку, сервіс супроводжує користувача інформаційними повідомленнями про успішні дії. Також інформаційний Alert виводиться користувачу в разі відстутності страв за обраними параметрами фільтрації.

* #### *Нефункціональні вимоги*

  * Продуктивність: система забезпечує швидку обробку фільтрів та відображення сторінок для користувачів навіть при великому навантаженні. Застосовано пагінацію для часткового завантаження та виведення страв та відгуків про сервіс.

  * Безпека: Користувачі можуть бути впевнені в безпеці своїх особистих даних та операцій з оплатою.

  * Архітектурна гнучкість: Система є розширюваною та здатною легко інтегруватися з іншими сервісами.

### *Архітектура системи*

---
Система "Eatly" базується на клієнт-серверній архітектурі та використовує сучасні технології для забезпечення надійності та продуктивності. Основні компоненти системи включають:

**Клієнтський інтерфейс:** Розроблений з використанням React та Material-UI, що забезпечує користувачам зручний інтерфейс для перегляду та замовлення їжі. Вертска Додатку є адаптивною до різних пристроїв, надаючи однакові можливості користувачам як на комп'ютерах, так і на мобільних пристроях та планшетах.

**Серверна частина** використовує трирівневу архітектуру, побудовану на Node.js і Express.js, для надійності та ефективності. За допомогою цих технологій ми забезпечуємо швидке оброблення запитів, надійну роботу і високу продуктивність, створюючи надійну основу для нашого проекту.

База даних: Використовується документо-орієнтована система управління БД MongoDB для зберігання інформації про користувачів, ресторани, страви та замовлення, забезпечуючи ефективне та масштабоване управління даними.

### *Дизайн інтерфейсу*
---
Дизайн інтерфейсу "Eatly" розроблений з увагою до користувацького досвіду. Включає в себе чіткі макети сторінок, використання приємних кольорів, інтерактивності на сторінці та інтуїтивне розміщення елементів у веб-додатку.

### *База даних*
---
База даних системи "Eatly" побудована на основі системи керування базами даних із сімейства NoSQL, MongoDB, в основі якої лежить документо-орієнтована модель і включає такі основні складові:

***Користувачі***: дані про зареєстрованих користувачів, включаючи їхні особисті дані (окрім паролю) та історію замовлень.

***Ресторани***: інформація про ресторани, які співпрацюють з платформою "Eatly", включаючи їхню адресу, опис закладу, рейтинг, меню.

***Страви***: інформація про страву, вартість, категорії, рейтинг та зображення страв, які пропонуються в ресторанах.

***Улюблені страви***: кожен користувач має свій список улюблених страв, який може змінюватись та відображатись при авторизації на сайті.

***Кошик***: зареєстрований користувач ніколи не загубить обраний до кошика товар, навіть при непередбачуваних обставинах. Кошик завжди оновлюється і зберігається в базі даних.

***Замовлення***: вміст, номер та вартість замовлення і дані користувача.

***Відгуки***: кожен відгук буде корисним для нових користувачів та для покращення сервісу додатку.

### *Алгоритми та логіка*
---
Використання **Redux Toolkit** для ефективного управління Станом додатку.

Реалізація взаємодії з сервером через **Axios** для виконання запитів, обробки відповідей та оновлення стану додатку на основі отриманих даних.

Інтеграція **Material-UI** компонентів для швидкої і зручної розробки інтерфейсу, з використанням стилів, налаштованої під додаток GlobalTheme та готових елементів дизайну.

Використання бібліотек **Formik** для керування станом форм та **Yup** для валідації введених даних, забезпечуючи користувачам зручний та безпечний ввід інформації.

Використання **React Router** для реалізації навігації в додатку та перехоплення URL, забезпечуючи коректнe відображення компонентів на основі шляхів.

Застосування **Redux Persist** для збереження певних частин стану додатку в локальному сховищі, щоб забезпечити збереження інформації між сесіями.

Використано **ESLint** для покращення якості коду та виявлення помилок та стилістичних невідповідностей. Встановлення стандартів коду та їх автоматичне виконання забезпечило консистентність та полегшило роботу команди розробників.

Використано **Netlify** для швидкого та простого розгортання додатку, забезпечення автоматичного вивантаження коду з GitHub, автоматичної побудови та CDN-розповсюдження для покращення швидкодії та доступності проекту.

Використання бібліотеки **Swiper**.

*Ці алгоритми та логічні підходи сприяють розробці продуктивного, зручного та функціонального додатку.*


---
Система "Eatly" - це сучасна онлайн-платформа для замовлення їжі з різних ресторанів та кафе. Вона спрощує процес вибору та замовлення страв, надаючи користувачам доступ до різноманітних кулінарних пропозицій. Разом зі зручним інтерфейсом та широким функціоналом, "Eatly" робить кулінарні пригоди ще смачнішими та комфортнішими.

Ми сподіваємось, що ця документація надає вам чітке уявлення про систему "Eatly" та сприяє кращому розумінню її функцій та можливостей. Якщо у вас є додаткові питання чи коментарі, будь ласка, зв'яжіться з нашою командою за адресою <info@eatly.com>. Ми готові вас вислухати та надати необхідну підтримку.

***Дякуємо за використання "Eatly" та бажаємо вам приємних кулінарних вражень!***

---

### *Інформація про авторів*
---
**Цю документацію підготувала команда розробників проекту "Eatly":**

---

* Анна Штендера
* Дмитро Кудь
* Ігор Качер
* Оксана Ковтун
* Роман Джавадов
* Степан Думенко
* Юрій Городній
* Ярослав Грошев

---
Цей проект був справжньою колективною роботою, де кожен учасник доклав максимальних зусиль, знань та часу. Кожен мав досвід роботи з новими завданнями, що потребували читання документації та використання нового досвіду і знань. Дружня атмосфера, взаємодопомога і колективне вирішеня складних завдань, дали змогу в обмежений час підготувати максимально зручний і дружній до користувача додаток.

Стартом роботи над проектом була колективна генерація img products та partners за допомогою [pencraft](https://gencraft.com).

---

* **Анна Штендера:**
  * підлючення reset.scss,
  * підключення і налаштування husky,
  * налаштування GlobalTheme в MaterialUI,
  * створено React-компонент Header з маршрутизацією,
  * створено React-компонент custom Input,
  * створено сторінку CustomerSupport з логікою зворотнього зв'язку з користувачем, додано на сервері логіку обробки звернень користувачів,
  * додано preloader на додаток,
  * додано кнопку ScrollToTop та відновлення скролу при переході між сторінками,
  * написання логіки реєстрації користувача,
  * створення сторінки CheckoutPage з логікою збирання даних користувача і оформлення замовлення, автозаповнення форми для авторизованого користувача, відправкою на пошту листа,
  * створення сторінок PaymentPage та OrderConfirmation,
  * написання логіки пагінації, часткового завантаження та виведення страв на сторінку,
  * написання фільтрів через query-параметри для фільтрації та сортування страв,
  * створено customHook useGetAPI,
  * додано на сервері логіку: фільтрації, сортування та пошуку ресторанів; фільтрації та сортування відгуків; отримання одного ресторану по id; отримання списків назв усіх продуктів та усіх ресторанів;
  * додано серверну логіку для створення тимчасового посилання для скидання паролю, яке використовує JWT токен, відправки листа з інструкціями, перезапису старого паролю на новий,
  * відредаговано в controller forgotPassword, та створено route та controller для resetPassword,
  * стилізовано лист з оформленим замовленням та лист для скидання забутого паролю,
  * додано errorBoundary та створено компонент SomethingWentWrong для відмалювання при помилці в роботі додатку
  * review коду колег.
* **Дмитро Кудь:**
  * реєстрація та створення БД MongoDB,
  * створення google account та e-mail для роботи команди з проектом і БД,
  * створено React-компонент Footer з маршрутизацією,
  * створено React-компонент Search з перемиканням пошуку по ресторанам/стравам, автозаповленням та логікою пошуку,
  * створено React-компонент Filter для фільтрації страв за категоріями, ціною, популярністю,
  * створено контейнер для Search, Filter, Swipper,
  * написання запитів та збереження фільтрів в url через query параметри,
  * створено React-компонент Sorter,
  * створено page AboutUs,
  * налаштовано Jest, на покриття додатку тестами,
  * review коду колег.
* **Ігор Качер:**
  * наповнення MongoDB json зі стравами та партнерами,
  * редагування та доповнення макету,
  * підключення fonts до проекту,
  * написання логіки авторизації користувача на сайті,
  * створення React-компоненту Get Started Section,
  * додано бібліотеку та налаштовано redux-persist,
  * додано зображення до cloudinary.com, прописано URL на MongoDB,
  * робота зі SwiperBanner, стилізація,
  * робота над стилізацією React-компонента ProductCard,
  * створено компонент 404 page,
  * .env змінні до клієнту та серверу,
  * project deployment,
  * додано cors config,
  * огорнуто компоненти в memo,
  * review коду колег.
* **Оксана Ковтун:**
  * створення перевикористовуваного React-компонента Modal,
  * створення робочої сторінки окремої страви ProductPage,
  * створення робочого React-компонента ReviewItem та використання його в каруселі відгуків та на сторінці відгуків,
  * додано можливість додавання нового відгуку, та відображення його на сторінці відгуків,
  * реалізовано карусель відгуків на головній сторінці додатку зі скролом та кнопками гортання відгуків, та перехід на сторінку Review з автоматичним скролом до вибраного відгуку,
  * реалізовано часткове завантаження коментарів за принципом безкінечного скролу,
  * створено сторінку улюблених товарів, та реалізовано додавання до улюблених та видалення страв зі списку улюблених,
  * налаштування GlobalTheme в MaterialUI,
  * створено форми для можливості відновлення паролю, модальне вікно з повідомленням про відправку листа з посиланням, на серверній стороні додано route, створено в controller forgotPassword,
  * тестування React-компонентів, review тестів та аналіз результатів їх виконання,
  * написання та стилізація [Readme.md](Readme.md) проекту.
  * review коду колег.
* **Роман Джавадов:**
  * організовано Routs, загорнуто  в BrowserRouter,
  * підключено Redux Toolkit,
  * створено React-компонент RestaurantItem,
  * створено перевикористовуваний React-компонент ListItem,
  * створено React-компонент SwiperBanner,
  * створено і стилізовано сторінку партнерів-ресторанів,
  * створено і стилізовано сторінку одного ресторану RestaurantPage,
  * робота над створенням презентації,
  * створено і використано Context і на його основі кастомний хук Alert для виведення повідомлень про дії користувача на сторінках додатку.
* **Степан Думенко:**
  * створено віддалений репозиторій на GitHub,
  * додано backend згідно документації до репозиторію,
  * налаштовано EsLint,
  * підключено бібліотеки необхідні для роботи над проектом,
  * налаштування GlobalTheme в MaterialUI,
  * створено React-компонента ProductItem,
  * робота над логікою додавання та видаленння товарів з кошика,
  * робота над створенням повідомлень про дії користувача на сторінках додатку,
  * підготовка та оформлення презентації проекту.
* **Юрій Городній:**
  * створено React-компонент форми реєстрації з валідацією введених даних,
  * створено React-компонент EatlyInfo,
  * створено React-компонент MobileApp,
  * створено сторінку ReviewPage,
  * написання логіки авторизації через google account, використання google API,
  * створено компонент Skeleton та додано до всіх елементів, що завантажуються з сервера.
* **Ярослав Грошев:**
  * створенно React-компонент форми LogIn з валідацією введених даних,
  * створенно сторінку Cart,
  * реалізовано можливість створення та видалення кошика для авторизованого користувача,
  * створено випадаючий список miniCart,
  * робота над логікою додавання та видаленння товарів з кошика,
  * створено instance interceptors з можливістю використання даних зі state redux,
  * написання кастомних хуків,
  * реалізовано можливість оформлення замовлення з різних ресторанах,
  * review коду колег.

---
#### :camera: Скріншоти

<details><summary>Order confirmation letter</summary>
<img src="./imgReadme/ScreenshotOrder.png" alt="Screenshot-Order" border="1">
</details>

<details><summary>Email with Reset password</summary>
<img src="./imgReadme/ScreenshotLetter.png" alt="Screenshot-Letter" border="1">
</details>

<details><summary>New customer request</summary>
<img src="./imgReadme/ScreenshotSupport.png" alt="Screenshot-Letter" border="1">
</details>

----

**Версія 1.0 (поточна версія)**

