export const integralQuizzes = [
    {
      id: '1',
      questions: [
        {
          question: "Jika f(x) = x², berapa hasil dari jumlah Riemann menggunakan 4 subinterval yang sama pada interval [0, 1]?",
          answers: [
            "1/4",
            "7/32",
            "7/24",
            "1/3"
          ],
          correctAnswer: 2
        },
        {
          question: "Hasil dari ∫₀¹ x² dx adalah?",
          answers: [
            "1/2",
            "1/3",
            "1/6",
            "1"
          ],
          correctAnswer: 1
        },
        {
          question: "Hasil jumlah Riemann untuk f(x) = x² di [0,1] dengan 4 subinterval adalah?",
          answers: [
            "7/24",
            "1/3",
            "7/32",
            "1/4"
          ],
          correctAnswer: 0
        },
      ],
    },
    {
      id: '2',
      questions: [
        {
          "question": "Jika F(x) adalah antiturunan dari f(x), menurut Teorema Dasar Kalkulus, apa nilai F'(x)?",
          "answers": [
            "f(x)",
            "F(x)",
            "∫f(x)dx",
            "0"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Menurut Teorema Dasar Kalkulus, jika F'(x) = f(x), maka ∫ₐᵇ f(x) dx sama dengan?",
          "answers": [
            "F(b) - F(a)",
            "F(a) - F(b)",
            "F(b) + F(a)",
            "F(a) + F(b)"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Apa nilai rata-rata dari f(x) = x² pada interval [0,2] menurut Teorema Nilai Rata-Rata Integral?",
          "answers": [
            "2/3",
            "4/3",
            "1",
            "8/3"
          ],
          "correctAnswer": 1
        },
      ],
    },
    {
      id: '3',
      questions: [
        {
          "question": "Dalam metode Simpson 1/3, pembagian interval harus berjumlah?",
          "answers": [
            "Ganjil",
            "Genap",
            "Prima",
            "Kelipatan tiga"
          ],
          "correctAnswer": 1
        },
        {
          "question": "Metode Riemann yang menggunakan titik tengah interval disebut?",
          "answers": [
            "Tengah",
            "Kiri",
            "Midpoint",
            "Simpson"
          ],
          "correctAnswer": 2
        },
        {
          "question": "Jika f(x) = x², maka hasil pendekatan integral ∫₀¹ f(x) dx dengan 4 subinterval menggunakan metode Simpson adalah?",
          "answers": [
            "1/3",
            "1/2",
            "1/4",
            "2/3"
          ],
          "correctAnswer": 0
        }
      ]
    },
    {
      id: '4',
      questions: [
        {
          "question": "Apa rumus umum untuk menghitung luas daerah di bawah kurva y = f(x) pada interval [a, b]?",
          "answers": [
            "∫ₐᵇ f(x) dx",
            "f(b) - f(a)",
            "∫₀¹ f(x) dx",
            "F(b) + F(a)"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Luas daerah yang dibatasi oleh y = x² dan sumbu x pada interval [0,1] adalah?",
          "answers": [
            "1/3",
            "1/4",
            "1/2",
            "1"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Jika dua kurva f(x) = x² dan g(x) = x membatasi suatu daerah pada [0,1], luas daerahnya adalah?",
          "answers": [
            "1/6",
            "1/3",
            "1/2",
            "1/4"
          ],
          "correctAnswer": 0
        },
      ]
    },
    {
      id: '5',
      questions: [
        {
          "question": "Metode apa yang digunakan untuk menghitung volume benda putar dengan memotong benda menjadi lapisan-lapisan tipis berbentuk lempeng?",
          "answers": [
            "Metode Lempeng",
            "Metode Cakram",
            "Metode Cincin",
            "Metode Kulit Tabung"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Volume benda yang diputar sekitar sumbu x dengan menggunakan metode cakram dapat dihitung dengan rumus?",
          "answers": [
            "π∫ₐᵇ [f(x)]² dx",
            "π∫ₐᵇ f(x) dx",
            "2π∫ₐᵇ x f(x) dx",
            "π∫ₐᵇ [f(x) - g(x)]² dx"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Volume benda yang diputar sekitar sumbu x dengan menggunakan metode kulit tabung dihitung dengan rumus?",
          "answers": [
            "2π∫ₐᵇ x f(x) dx",
            "π∫ₐᵇ f(x)² dx",
            "2π∫ₐᵇ f(x) dx",
            "π∫ₐᵇ [f(x)]² dx"
          ],
          "correctAnswer": 0
        }
      ]
    },
    {
      id: '6',
      questions: [
        {
          "question": "Jika gaya F(x) = 3x pada interval [0, 2], berapa usaha yang dilakukan gaya tersebut?",
          "answers": [
            "12",
            "6",
            "4",
            "3"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Jika gaya F(x) = 2x² dan benda bergerak dari x = 0 hingga x = 3, berapa usaha yang dilakukan?",
          "answers": [
            "54",
            "18",
            "36",
            "72"
          ],
          "correctAnswer": 0
        }
      ]
    },
    {
      "id": '7',
      "questions": [
        {
          "question": "Rumus untuk menghitung momen inersia I dari benda yang diputar di sekitar sumbu adalah?",
          "answers": [
            "I = ∫ r² dm",
            "I = ∫ r dm",
            "I = ∫ r² dA",
            "I = ∫ r dA"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Jika luas suatu bidang A adalah 10 dan momen pertama terhadap sumbu y adalah 30, maka jarak centroid dari sumbu y adalah?",
          "answers": [
            "3",
            "1",
            "2",
            "5"
          ],
          "correctAnswer": 0
        },
      ]
    },
    {
      "id": '8',
      "questions": [
        {
          "question": "Jika lim x→0 (sin(x)/x) = ?",
          "answers": [
            "1",
            "0",
            "∞",
            "-1"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Bentuk tak tentu ∞/∞ pada limit dapat diselesaikan dengan menggunakan?",
          "answers": [
            "Aturan L'Hopital",
            "Integral Cakram",
            "Metode Kulit Tabung",
            "Teorema Nilai Rata-rata"
          ],
          "correctAnswer": 0
        },
      ]
    },
    {
      "id": '9',
      "questions": [
        {
          "question": "Integral dengan batas tak hingga dapat diselesaikan dengan cara?",
          "answers": [
            "Limit",
            "Teorema Nilai Rata-rata",
            "Aturan L'Hopital",
            "Metode Kulit Tabung"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Integral ∫₀^∞ 1/(x² + 1) dx adalah?",
          "answers": [
            "π/2",
            "1",
            "∞",
            "0"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Untuk integral ∫₀^∞ e^(-x²) dx, hasilnya adalah?",
          "answers": [
            "√π",
            "1",
            "0",
            "∞"
          ],
          "correctAnswer": 0
        }
      ]
    },
    {
      "id": '10',
      "questions": [
        {
          "question": "Integral lipat digunakan untuk menghitung?",
          "answers": [
            "Luas",
            "Usaha",
            "Kecepatan",
            "Gaya"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Untuk menghitung volume daerah dengan batas dalam dan luar, kita menggunakan integral?",
          "answers": [
            "Integral berulang",
            "Integral tunggal",
            "Integral tak tentu",
            "Integral tak hingga"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Rumus umum untuk integral lipat dua pada daerah D adalah?",
          "answers": [
            "∫∫ f(x,y) dx dy",
            "∫ f(x,y) dx",
            "∫ f(x,y) dy",
            "∫ f(x,y) dt"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Untuk menghitung luas suatu daerah D menggunakan integral lipat dua, kita menghitung?",
          "answers": [
            "∫∫ 1 dx dy",
            "∫ 1 dx",
            "∫ f(x,y) dx",
            "∫∫ f(x,y) dx dy"
          ],
          "correctAnswer": 0
        },
      ]
    }               
  ];
  