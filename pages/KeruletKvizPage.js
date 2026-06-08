'use client';

import React, { useState, useMemo } from 'react';
import '../styles/KeruletKviz.css';

const keruletek = [
  { nev: "I.",     fiatal:3,  csalados:4,  idos:8,  szingli:6,  kozlekedes:8,   kozbiztonsag:6, zold:10, megfizethetoseg:1.0 },
  { nev: "II.",    fiatal:2,  csalados:9,  idos:9,  szingli:3,  kozlekedes:6,   kozbiztonsag:7, zold:7,  megfizethetoseg:2.2 },
  { nev: "III.",   fiatal:4,  csalados:7,  idos:7,  szingli:4,  kozlekedes:6.5, kozbiztonsag:8, zold:10, megfizethetoseg:4.3 },
  { nev: "IV.",    fiatal:4,  csalados:6,  idos:6,  szingli:5,  kozlekedes:7,   kozbiztonsag:7, zold:3,  megfizethetoseg:5.9 },
  { nev: "V.",     fiatal:6,  csalados:2,  idos:6,  szingli:9,  kozlekedes:10,  kozbiztonsag:1, zold:8,  megfizethetoseg:1.4 },
  { nev: "VI.",    fiatal:10, csalados:1,  idos:4,  szingli:10, kozlekedes:9.5, kozbiztonsag:3, zold:1,  megfizethetoseg:3.5 },
  { nev: "VII.",   fiatal:10, csalados:1,  idos:4,  szingli:10, kozlekedes:9,   kozbiztonsag:2, zold:1,  megfizethetoseg:3.9 },
  { nev: "VIII.",  fiatal:9,  csalados:3,  idos:5,  szingli:9,  kozlekedes:8.5, kozbiztonsag:3, zold:3,  megfizethetoseg:5.5 },
  { nev: "IX.",    fiatal:9,  csalados:4,  idos:5,  szingli:9,  kozlekedes:8.5, kozbiztonsag:4, zold:5,  megfizethetoseg:4.7 },
  { nev: "X.",     fiatal:5,  csalados:5,  idos:6,  szingli:6,  kozlekedes:6.5, kozbiztonsag:4, zold:10, megfizethetoseg:8.0 },
  { nev: "XI.",    fiatal:8,  csalados:8,  idos:6,  szingli:7,  kozlekedes:8.5, kozbiztonsag:8, zold:8,  megfizethetoseg:3.0 },
  { nev: "XII.",   fiatal:3,  csalados:7,  idos:9,  szingli:4,  kozlekedes:5,   kozbiztonsag:9, zold:9,  megfizethetoseg:1.8 },
  { nev: "XIII.",  fiatal:9,  csalados:5,  idos:5,  szingli:9,  kozlekedes:9,   kozbiztonsag:6, zold:3,  megfizethetoseg:2.6 },
  { nev: "XIV.",   fiatal:7,  csalados:7,  idos:6,  szingli:7,  kozlekedes:8,   kozbiztonsag:5, zold:9,  megfizethetoseg:5.1 },
  { nev: "XV.",    fiatal:4,  csalados:6,  idos:7,  szingli:5,  kozlekedes:5,   kozbiztonsag:8, zold:3,  megfizethetoseg:6.7 },
  { nev: "XVI.",   fiatal:2,  csalados:10, idos:7,  szingli:2,  kozlekedes:4,   kozbiztonsag:9, zold:3,  megfizethetoseg:7.5 },
  { nev: "XVII.",  fiatal:2,  csalados:10, idos:7,  szingli:2,  kozlekedes:3,   kozbiztonsag:10, zold:5,  megfizethetoseg:8.8 },
  { nev: "XVIII.", fiatal:3,  csalados:9,  idos:7,  szingli:3,  kozlekedes:3.5, kozbiztonsag:7, zold:3,  megfizethetoseg:9.6 },
  { nev: "XIX.",   fiatal:4,  csalados:6,  idos:7,  szingli:5,  kozlekedes:6.5, kozbiztonsag:6, zold:3,  megfizethetoseg:7.1 },
  { nev: "XX.",    fiatal:4,  csalados:6,  idos:7,  szingli:5,  kozlekedes:5.5, kozbiztonsag:6, zold:3,  megfizethetoseg:9.2 },
  { nev: "XXI.",   fiatal:4,  csalados:6,  idos:7,  szingli:5,  kozlekedes:5,   kozbiztonsag:6, zold:5,  megfizethetoseg:8.4 },
  { nev: "XXII.",  fiatal:3,  csalados:9,  idos:7,  szingli:3,  kozlekedes:3.5, kozbiztonsag:10, zold:6,  megfizethetoseg:6.3 },
  { nev: "XXIII.", fiatal:3,  csalados:8,  idos:6,  szingli:2,  kozlekedes:2.5, kozbiztonsag:5, zold:1,  megfizethetoseg:10.0 },
];

const keruletElemzesRovid = {
  "I.": "Idősebb és magasabb státuszú lakosság jellemzi, az idősek aránya jelentősen az átlag felett van, míg a 20–39 éves fiatalok aránya alacsonyabb. Erős az értelmiségi jelenlét. Zöldellátottsága kiváló (Gellért-hegy, Tabán), közbiztonsága az átlag felett van, bár a turizmus miatt sok kisebb lopást regisztrálnak. Tömegközlekedése jó (M2 metró), de a dombos terep miatt nem mindenhol egyenletes. Nagyon drága (2,122 millió Ft/nm), ezért inkább tehetősebbeknek és idősebbeknek ajánlott, akik nyugodt, zöld környezetet keresnek a belváros közelében.",
  "II.": "Családos és idős profil dominál, sok 40 év feletti lakos és értelmiségi él itt. Zöldellátottsága jó, sok erdő és budai hegyvidéki terület található. Közbiztonsága kifejezetten jó. Tömegközlekedése közepes, a dombos részeken inkább buszra vagy autóba kell számítani. Drága (1,774 millió Ft/nm), ezért inkább családosoknak és idősebbeknek ajánlott, akik nyugodt, zöld környezetet szeretnének a budai oldalon.",
  "III.": "Vegyes, de inkább családbarát jellegű, sok 30–49 éves család él itt. Zöldellátottsága nagyon jó, jelentős erdős területek és HÉV-menti zöldfolyosók segítik. Közbiztonsága az átlag felett van. Tömegközlekedése közepes-jó (HÉV + 1-es villamos). Árban közepesen drága, jó választás családoknak és idősebbeknek, akik kiegyensúlyozott környezetet keresnek.",
  "IV.": "Dinamikus középosztálybeli kerület, sok 30–49 éves család és fiatal lakik itt. Zöldellátottsága gyenge. Közbiztonsága közepes. Tömegközlekedése jó (M3 metró végállomás és HÉV). Megfizethetőbb oldalról közelíti meg az átlagot, ezért családosoknak és fiatal pároknak ajánlott, akik jó közlekedést szeretnének viszonylag kedvező áron.",
  "V.": "Fiatalos, szingli-domináns kerület, magas a 20–39 évesek aránya és sok fiatal értelmiségi lakik itt. Zöldellátottsága hivatalosan jó, de főleg kis parkokból áll. Közbiztonsága a legrosszabb Budapesten (293% az átlag). Tömegközlekedése kiváló (metró-csomópont). Nagyon drága, inkább fiatal egyedülállóknak és pároknak ajánlott, akik a központi nyüzsgést és tökéletes közlekedést keresik, és nem zavarja őket a magasabb ár és a zsúfoltság.",
  "VI.": "Budapest egyik legfiatalosabb kerülete, magas a 20–39 éves fiatalok aránya és sok fiatal értelmiségi él itt. Zöldellátottsága nagyon gyenge. Közbiztonsága gyenge az éjszakai élet miatt. Tömegközlekedése kiváló (M1 + körúti villamosok). Drága, leginkább gazdag porontyoknak, egyedülállóknak és bulizós életmódot kedvelőknek ajánlott.",
  "VII.": "Erősen fiatal és szingli-barát, a 20–39 évesek aránya jelentősen magasabb az átlagosnál. Zöldellátottsága a legrosszabb. Közbiztonsága nagyon gyenge. Tömegközlekedése nagyon jó (több metróvonal). Drága, tipikusan fiataloknak, egyedülállóknak és kreatív, nyüzsgő életet élő embereknek való.",
  "VIII.": "Fiatalos és átalakuló kerület, sok 20–39 éves egyedülálló és fiatal pár lakik itt. Zöldellátottsága gyenge. Közbiztonsága még mindig gyenge, bár javulóban van. Tömegközlekedése nagyon jó. Árban közepes, jó választás fiatal egyedülállóknak és pároknak, akik fejlődő, élénk környezetet keresnek kedvezőbb áron.",
  "IX.": "Modern és fiatalos, magas a 20–39 éves egyedülállók és újdonsült családok aránya. Zöldellátottsága közepes. Közbiztonsága az átlag felett van. Tömegközlekedése nagyon jó (M3/M4 + 4-6 villamos). Árban közepesen drága, kiegyensúlyozott választás fiataloknak és fiatal családoknak.",
  "X.": "Vegyes, egyre családosabb jellegű, sok 30–49 éves család él itt. Zöldellátottsága kiváló (sok park). Közbiztonsága közepesnél gyengébb. Tömegközlekedése közepes. Jó ár/érték arány, családosoknak és azoknak ajánlott, akik zöldet és megfizethető lakást keresnek.",
  "XI.": "Kiegyensúlyozott sweet spot, sok 20–39 éves fiatal és család lakik itt, erős az értelmiségi jelenlét. Zöldellátottsága jó. Közbiztonsága az átlag felett van. Tömegközlekedése nagyon jó (M4 + 4-6 villamos). Drágább az átlagnál, de sok szempontból az egyik legjobb kompromisszum fiatal pároknak és családoknak.",
  "XII.": "Idősebb és magasabb státuszú lakosság, erős értelmiségi réteg. Zöldellátottsága nagyon jó (hatalmas erdők és Normafa). Közbiztonsága kiváló. Tömegközlekedése gyengébb a dombos terep miatt. Extrém drága, leginkább tehetősebb családosoknak és idősebbeknek ajánlott, akik maximális zöldet és nyugalmat keresnek.",
  "XIII.": "Fiatalos és dinamikus, magas a 20–39 éves fiatalok, és egyedülállók aránya. Zöldellátottsága gyenge. Közbiztonsága közel az átlaghoz. Tömegközlekedése kiváló (M3 + villamosok). Drága, fiatal egyedülállóknak és pároknak is nagyon jó választás a remek közlekedés miatt.",
  "XIV.": "Családbarát középosztályi kerület, sok 30–49 éves család él itt. Zöldellátottsága kiváló (Városliget közelsége). Közbiztonsága jó. Tömegközlekedése jó. Árban közepes, családosoknak és kiegyensúlyozott életet keresőknek ajánlott.",
  "XV.": "Családos és kertvárosi jellegű. Zöldellátottsága gyenge. Közbiztonsága jó. Tömegközlekedése gyengébb. Megfizethető, családosoknak és idősebbeknek jó választás.",
  "XVI.": "Kertvárosi, családos és idős profil. Zöldellátottsága közepes-gyenge. Közbiztonsága nagyon jó. Tömegközlekedése gyenge. Megfizethető, nyugodtabb életet kereső családosoknak és idősebbeknek ajánlott.",
  "XVII.": "Erősen családbarát, sok gyerekes család él itt. Zöldellátottsága közepes. Közbiztonsága kiváló (Budapest egyik legbiztonságosabb kerülete). Tömegközlekedése gyenge. Nagyon jó ár/érték, családosoknak és nyugodt környezetet keresőknek erősen ajánlott.",
  "XVIII.": "Családos és megfizethető. Zöldellátottsága gyenge. Közbiztonsága jó. Tömegközlekedése gyenge. Jó ár/érték, családosoknak ajánlott.",
  "XIX.": "Vegyes, családos jellegű. Zöldellátottsága gyenge. Közbiztonsága átlag feletti. Tömegközlekedése közepes. Megfizethető, átlagos igényekkel rendelkező családoknak jó választás.",
  "XX.": "Családos és megfizethető. Zöldellátottsága gyenge. Közbiztonsága átlagos. Tömegközlekedése közepes. Olcsóbb oldalról jó családosoknak.",
  "XXI.": "Családos, inkább munkásabb jellegű. Zöldellátottsága közepes. Közbiztonsága közepes. Tömegközlekedése gyengébb (sziget-jelleg). Olcsó, családosoknak ajánlott, akik nem bánják az elszigeteltebb környezetet.",
  "XXII.": "Kertvárosi, családos. Zöldellátottsága jó (erdős részek). Közbiztonsága jó. Tömegközlekedése gyenge. Megfizethető, családosoknak és természetközeli életet keresőknek ajánlott.",
  "XXIII.": "Családos és nagyon megfizethető. Zöldellátottsága nagyon gyenge. Közbiztonsága jó. Tömegközlekedése a leggyengébb. Legolcsóbb kerület, családosoknak ajánlott, akik a minimális költségeket priorizálják."
};

const KeruletKvizPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    korcsoport: null,
    csalad: null,
    nyuzsgo: 5,
    nyugodt: 5,
    kozlekedes: 5,
    zold: 5,
    kozbiztonsag: 5,
    megfizethetoseg: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const kerdesek = [
    {
      id: 'nyuzsgo',
      type: 'slider',
      question: 'Mennyire vonz a városi pezsgés, nyüzsgés, szórakozás?',
      description: 'Bulizós helyek, éttermek, emberek, éjszakai élet',
      icon: '/kviz/party.png',
      leftLabel: 'Nem érdekel',
      rightLabel: 'Nagyon fontos'
    },
    {
      id: 'nyugodt',
      type: 'slider',
      question: 'Mennyire fontos számodra a nyugalom, és a csendes környezet?',
      description: 'Kevés zaj, minimális tömeg, kellemes szomszédság',
      icon: '/kviz/shield.png',
      leftLabel: 'Nem számít',
      rightLabel: 'Nagyon fontos'
    },
    {
      id: 'kozlekedes',
      type: 'slider',
      question: 'Mennyire fontos a jó tömegközlekedés?',
      description: 'Metró, villamos, busz, HÉV - mennyire számít, hogy gyorsan eljuss A-ból B-be?',
      icon: '/kviz/transportation.png',
      leftLabel: 'Nem számít',
      rightLabel: 'Nagyon fontos'
    },
    {
      id: 'zold',
      type: 'slider',
      question: 'Mennyire fontos a zöldterület közelsége?',
      description: 'Park, erdő, futóút, játszótér - mennyire vágyódik a természetközeli környezetre?',
      icon: '/kviz/green.png',
      leftLabel: 'Nem számít',
      rightLabel: 'Nagyon fontos'
    },
    {
      id: 'kozbiztonsag',
      type: 'slider',
      question: 'Mennyire fontos a közbiztonság és nyugalom?',
      description: 'Éjszakai hazasétálás, környék hangulata, szomszédok - mennyire stresszel a biztonság?',
      icon: '/kviz/shield.png',
      leftLabel: 'Nem számít',
      rightLabel: 'Nagyon fontos'
    },
    {
      id: 'megfizethetoseg',
      type: 'slider',
      question: 'Mennyire fontos a megfizethetőség?',
      description: 'Lakásár, albérleti díj - mennyire szab határt a költségvetésed?',
      icon: '/kviz/piggy.png',
      leftLabel: 'Nem számít',
      rightLabel: 'Nagyon fontos'
    },
    {
      id: 'korcsoport',
      type: 'radio',
      question: 'Melyik korosztályba tartozol?',
      options: [
        { value: 'fiatal', label: '18–35 éves (fiatal)', icon: '/kviz/youth.png' },
        { value: 'kozepkoru', label: '36–60 éves (középkorú)', icon: '/kviz/family.png' },
        { value: 'idos', label: '60+ éves (idősebb)', icon: '/kviz/elderly.png' },
      ]
    },
    {
      id: 'csalad',
      type: 'radio',
      question: 'Jelenleg milyen családi helyzetben vagy?',
      options: [
        { value: 'egyedulallo', label: 'Egyedülálló vagyok', icon: '/kviz/single.png' },
        { value: 'par', label: 'Párban élek (gyerek nélkül)', icon: '/kviz/couple.png' },
        { value: 'csalados', label: 'Családos vagyok (gyerekkel)', icon: '/kviz/family.png' },
      ]
    }
  ];

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Kérlek, érvényes email címet adj meg!');
      return;
    }
    if (!acceptedTerms) {
      alert('Kérlek, fogadd el az adatkezelési tájékoztatót!');
      return;
    }

    setIsSending(true);
    
    const topDistricts = osszesEredmeny.slice(0, 10).map(ker => ({
      nev: ker.nev,
      pont: ker.pont
    }));

    try {
      const response = await fetch(`${baseUrl}/api/guest/send-kviz-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          topDistricts,
          marketingConsent: acceptedTerms
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setEmailSubmitted(true);
        setTimeout(() => {
          setShowEmailModal(false);
          setSubmitted(true);
        }, 1500);
      } else {
        throw new Error(data.message || 'Email küldés sikertelen');
      }
    } catch (error) {
      console.error('Email küldési hiba:', error);
      alert('Hiba történt az email küldése során. Kérlek, próbáld újra!');
    } finally {
      setIsSending(false);
    }
  };

  const osszesEredmeny = useMemo(() => {
    if (!submitted && !showEmailModal) return [];

    const totalImportance = 
      answers.nyuzsgo + 
      answers.nyugodt + 
      answers.kozlekedes + 
      answers.kozbiztonsag + 
      answers.zold + 
      answers.megfizethetoseg;

    const hasRealPreference = totalImportance > 12;

    const weights = {
      nyuzsgo: hasRealPreference ? answers.nyuzsgo / totalImportance : 1/6,
      nyugodt: hasRealPreference ? answers.nyugodt / totalImportance : 1/6,
      kozlekedes: hasRealPreference ? answers.kozlekedes / totalImportance : 1/6,
      kozbiztonsag: hasRealPreference ? answers.kozbiztonsag / totalImportance : 1/6,
      zold: hasRealPreference ? answers.zold / totalImportance : 1/6,
      megfizethetoseg: hasRealPreference ? answers.megfizethetoseg / totalImportance : 1/6,
    };

    const calcSimilarity = (value, importance, weight) => {
      if (importance <= 2) return 0;
      const diff = Math.abs(value - 10);
      let similarity = 10 - diff;
      return Math.max(0, similarity) * weight;
    };

    const rawScores = keruletek.map(ker => {
      let score = 0;

      if (answers.korcsoport === 'fiatal') {
        score += ker.fiatal * 1.05;
      } else if (answers.korcsoport === 'kozepkoru') {
        score += ((ker.fiatal + ker.csalados) / 2) * 1.1;
      } else if (answers.korcsoport === 'idos') {
        score += ker.idos * 1.05;
      }

      if (answers.csalad === 'csalados') {
        score += ker.csalados * 1.25;
      } else if (answers.csalad === 'par') {
        score += (ker.szingli + ker.csalados) / 2 * 0.85;
      } else if (answers.csalad === 'egyedulallo') {
        score += ker.szingli * 1.1;
      }

      score += calcSimilarity(ker.fiatal + ker.szingli, answers.nyuzsgo * 1.8, weights.nyuzsgo);
      score += calcSimilarity(ker.kozbiztonsag + ker.zold, answers.nyugodt * 1.6, weights.nyugodt);
      score += calcSimilarity(ker.kozlekedes, answers.kozlekedes, weights.kozlekedes);
      score += calcSimilarity(ker.kozbiztonsag, answers.kozbiztonsag, weights.kozbiztonsag);
      score += calcSimilarity(ker.zold, answers.zold, weights.zold);
      score += calcSimilarity(ker.megfizethetoseg, answers.megfizethetoseg, weights.megfizethetoseg);

      if (answers.csalad === 'csalados') {
        score += calcSimilarity(ker.kozlekedes, answers.kozlekedes, weights.kozlekedes * 0.7);
        score += calcSimilarity(ker.megfizethetoseg, answers.megfizethetoseg, weights.megfizethetoseg * 0.8);
      }

      return { ...ker, rawScore: score };
    });

    const scores = rawScores.map(k => k.rawScore);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const range = maxScore - minScore;

    const normalized = rawScores.map(ker => {
      let pont = range < 0.01 ? 5 : 1 + ((ker.rawScore - minScore) / range) * 9;
      return { ...ker, pont: Math.round(pont * 10) / 10 };
    });

    return normalized.sort((a, b) => b.pont - a.pont);
  }, [answers, submitted, showEmailModal]);

  const megjelenitettEredmeny = (showAll ? osszesEredmeny : osszesEredmeny.slice(0, 5))
    .map(ker => ({
      ...keruletek.find(k => k.nev === ker.nev),
      pont: ker.pont
    }));

  const handleRadioChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    setStep(step + 1);
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleNext = () => {
    if (step < kerdesek.length - 1) {
      setStep(step + 1);
    } else {
      setShowEmailModal(true);
    }
  };

  const handleSkipEmail = () => {
    setShowEmailModal(false);
    setSubmitted(true);
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({
      korcsoport: null,
      csalad: null,
      nyuzsgo: 5,
      nyugodt: 5,
      kozlekedes: 5,
      zold: 5,
      kozbiztonsag: 5,
      megfizethetoseg: 5,
    });
    setSubmitted(false);
    setShowAll(false);
    setShowEmailModal(false);
    setEmail('');
    setEmailSubmitted(false);
    setAcceptedTerms(false);
  };

  const handleViewProperties = (keruletNev) => {
    const romanToSlug = {
      "I.": "i", "II.": "ii", "III.": "iii", "IV.": "iv", "V.": "v",
      "VI.": "vi", "VII.": "vii", "VIII.": "viii", "IX.": "ix", "X.": "x",
      "XI.": "xi", "XII.": "xii", "XIII.": "xiii", "XIV.": "xiv", "XV.": "xv",
      "XVI.": "xvi", "XVII.": "xvii", "XVIII.": "xviii", "XIX.": "xix",
      "XX.": "xx", "XXI.": "xxi", "XXII.": "xxii", "XXIII.": "xxiii"
    };
    const slug = romanToSlug[keruletNev] || keruletNev.replace('.', '').toLowerCase();
    window.open(`/elado/lakas/budapest-${slug}-kerulet`, '_blank');
  };

  const getProgress = () => {
    if (submitted) return 100;
    let answeredCount = 0;
    if (answers.korcsoport) answeredCount++;
    if (answers.csalad) answeredCount++;
    const totalQuestions = kerdesek.length;
    const answered = Math.max(answeredCount, step + 1);
    return (answered / totalQuestions) * 100;
  };

  // Email modal
  if (showEmailModal) {
    return (
      <div className="kviz-page">
        <div className="kviz-container">
          <div className="kviz-header">
            <div className="confetti">📧</div>
            <h1>Részletes elemzés emailben</h1>
            <p className="kviz-intro">
              Küldjük el a teljes, 23 kerületre kiterjedő elemzést!
            </p>
          </div>
          
          <div className="kviz-form">
            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="email-form">
                <div className="email-form-content">
                  <div className="email-input-group">
                    <input
                      type="email"
                      placeholder="Email címed"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="email-input"
                    />
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        required
                      />
                      <span>
                        Elfogadom az <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Adatkezelési Tájékoztatót</a> 
                        {" "}és hozzájárulok, hogy az Ingatlan-Térkép marketing célú megkereséseket küldjön.
                      </span>
                    </label>
                    <button type="submit" disabled={isSending} className="email-submit-btn">
                      {isSending ? 'Küldés...' : 'Elemzés kérése →'}
                    </button>
                  </div>
                  
                  <button type="button" onClick={handleSkipEmail} className="skip-email-btn">
                    Nem kérem, mutasd a rövid eredményt
                  </button>
                </div>
              </form>
            ) : (
              <div className="email-success">
                <div className="success-icon">✅</div>
                <h3>Köszönjük!</h3>
                <p>Az elemzést elküldtük a <strong>{email}</strong> címre.</p>
                <p className="email-success-note">Átirányítás az eredményekre...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // EREDMÉNYEK MEGJELENÍTÉSE
  if (submitted) {
    return (
      <div className="kviz-page">
        <div className="kviz-container results">
          <div className="kviz-header success">
            <div className="confetti">🏆</div>
            <h1>A kerületi rangsorod</h1>
            <p className="kviz-intro">
              Válaszaid alapján ezek a kerületek illenek Hozzád leginkább (csökkenő sorrendben)
            </p>
          </div>

          <div className="results-list">
            {megjelenitettEredmeny.map((ker, index) => {
              const elemzes = keruletElemzesRovid[ker.nev] || "Ehhez a kerülethez még nem áll rendelkezésre elemzés.";
              
              return (
                <div key={ker.nev} className="result-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="result-rank" style={{ background: `linear-gradient(135deg, #5099ce, #3a7bb8)` }}>
                    {index + 1}
                  </div>
                  <div className="result-content">
                    <h2>{ker.nev}. kerület</h2>
                    
                    <div className="result-analysis">
                      <p>{elemzes}</p>
                    </div>
                    
                    <div className="result-stats">
                      <span>Közlekedés: {ker.kozlekedes}/10</span>
                      <span>Biztonság: {ker.kozbiztonsag}/10</span>
                      <span>Zöldterület: {ker.zold}/10</span>
                      <span>Megfizethetőség: {ker.megfizethetoseg.toFixed(1)}/10</span>
                    </div>
                    
                    <button 
                      onClick={() => handleViewProperties(ker.nev)}
                      className="view-properties-btn"
                    >
                      🏠 Lakások megtekintése ebben a kerületben →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {!showAll && osszesEredmeny.length > 5 && (
            <button onClick={() => setShowAll(true)} className="show-all-btn">
              Összes kerület megtekintése
            </button>
          )}

          {showAll && (
            <button onClick={() => setShowAll(false)} className="show-all-btn">
              Csak a legjobb 5 mutatása
            </button>
          )}

          <div className="result-note">
            <p><strong>Értékelési rendszer</strong></p>
            <p>Közlekedés | Közbiztonság | Zöldterület | Megfizethetőség (1-10 skála)</p>
            <p>Megfizethetőség: 1 = legdrágább, 10 = legolcsóbb</p>
            <p className="email-reminder">📧 Szeretnéd megkapni a <strong>részletes, 23 kerületre kiterjedő elemzést</strong> emailben? <button onClick={handleReset} className="inline-reset">Kattints ide az újratöltéshez és kérd az emailes verziót!</button></p>
          </div>

          <button onClick={handleReset} className="reset-btn">
            Új kitöltés
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = kerdesek[step];
  const progress = getProgress();

  return (
    <div className="kviz-page">
      {/* Infó szekció */}
      <div className="info-section">
        <div className="info-container">
          <h2 className="info-title">Melyik budapesti kerület illik hozzád a legjobban?</h2>
          <p className="info-description">
            Válaszolj 8 egyszerű kérdésre, és 5 perc alatt személyre szabott ajánlást kapsz a 23 kerület közül.
          </p>
          <div className="info-features">
            <span>🎯 Személyre szabott</span>
            <span>⚡ Gyors és egyszerű</span>
            <span>📊 Adatvezérelt</span>
            <span>🏆 Tudományos módszer</span>
          </div>
        </div>
      </div>

      {/* Kvíz konténer */}
      <div className="kviz-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="kviz-header">
          <span className="step-indicator">{step + 1} / {kerdesek.length}</span>
          <h2 className="question-title">{currentQuestion.question}</h2>
          <p className="kviz-intro">{currentQuestion.description}</p>
        </div>

        <div className="kviz-form">
          {currentQuestion.type === 'radio' && (
            <div className="options-grid">
              {currentQuestion.options.map(opt => (
                <button
                  key={opt.value}
                  className={`option-btn ${answers[currentQuestion.id] === opt.value ? 'active' : ''}`}
                  onClick={() => handleRadioChange(currentQuestion.id, opt.value)}
                >
                  <img src={opt.icon} alt="" className="option-icon" />
                  <span className="option-label">{opt.label}</span>
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'slider' && (
            <div className="slider-wrapper">
              <img src={currentQuestion.icon} alt="" className="slider-icon" />
              <div className="slider-container">
                <span className="slider-left">{currentQuestion.leftLabel}</span>
                <input
                  type="range"
                  name={currentQuestion.id}
                  min="1"
                  max="10"
                  value={answers[currentQuestion.id]}
                  onChange={handleSliderChange}
                  className="slider"
                />
                <span className="slider-right">{currentQuestion.rightLabel}</span>
              </div>
              <div className="slider-value-display">
                <span className="value-label">{answers[currentQuestion.id]}</span>
                <span className="value-label">/10</span>
              </div>
              <div className="slider-hint">
                {answers[currentQuestion.id] <= 2 && "Ez a szempont szinte nem számít az eredményben"}
                {answers[currentQuestion.id] >= 8 && "Ez a szempont nagyban befolyásolja az eredményt"}
                {answers[currentQuestion.id] > 2 && answers[currentQuestion.id] < 8 && "Ez a szempont közepesen számít"}
              </div>
            </div>
          )}

          <div className="nav-buttons">
            {step > 0 && (
              <button onClick={handlePrev} className="nav-btn prev">
                ← Vissza
              </button>
            )}
            <button onClick={handleNext} className="nav-btn next">
              {step === kerdesek.length - 1 ? 'Eredmény megtekintése' : 'Következő →'}
            </button>
          </div>
        </div>
      </div>

      {/* SEO tartalom */}
      <div className="seo-content">
        <div className="container">
          <h2>Hogyan segít a kerületválasztó kvíz?</h2>
          <p>
            Budapesten a kerületek között hatalmas különbségek vannak az árak, a közlekedés, a zöldterület és a hangulat szempontjából. 
            Sokan hónapokat töltenek azzal, hogy eldöntsék, hol keressenek lakást. Ezzel a kvízzel gyorsabban és tudatosabban tudsz dönteni.
          </p>

          <h3>Miért érdemes kitölteni?</h3>
          <ul>
            <li>Segít szűkíteni a keresést 23 kerületről 3-5-re</li>
            <li>Megmutatja a rejtett előnyöket és hátrányokat</li>
            <li>Időt és felesleges ingatlan-nézegetést spórolhatsz</li>
            <li>Ingyenes és teljesen személyre szabott</li>
          </ul>

          <h3>Gyakori kérdések</h3>
          <div className="faq">
            <details>
              <summary>Melyik kerület a legjobb családosoknak?</summary>
              <p>A XI. Újbuda, XIV. Zugló, XVII. Rákosmente és III. Óbuda szokott a legnépszerűbb lenni családosok körében.</p>
            </details>
            <details>
              <summary>Melyik kerület a legolcsóbb?</summary>
              <p>Jelenleg a XXIII. Soroksár, XVIII. Pestszentlőrinc és a XXI. Csepel tartozik a legmegfizethetőbbek közé.</p>
            </details>
            <details>
              <summary>Lehet-e emailben kapni a teljes elemzést?</summary>
              <p>Igen, a kvíz végén lehetőséged van megadni az emailedet, és elküldjük a teljes, 23 kerületre kiterjedő részletes elemzést.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeruletKvizPage;