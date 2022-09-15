function readAndConvertEventDate() {
    // reads in the input
    var eventName = document.getElementById("name").value;
    var eventDate = document.getElementById("when").value;
    var eventTime = document.getElementById("whenTime").value;
    var eventZone = document.getElementById("whenZone").value;

    //gets the utc offset for user submitted timezone
    var timezone = getUTCOffset(eventZone);

    document.getElementById("eventName").value = eventName;

    let concattedDate = eventDate + 'T' + eventTime + timezone;

    let convertedDate = new Date(concattedDate);

    document.getElementById("convertedDate").value = convertedDate.getFullYear() + '-' + (convertedDate.getMonth() + 1)+ '-' + convertedDate.getDate();

    const convertedHours = String(convertedDate.getHours()).padStart(2, '0');
    const ConvertedMinutes = String(convertedDate.getMinutes()).padStart(2, '0');

    document.getElementById("convertedTime").value = convertedHours + ':' + ConvertedMinutes;
  
}

function sendEmail(){
    
    var name = document.getElementById('eventName').value;
    var date = document.getElementById('convertedDate').value;
    var time = document.getElementById('convertedTime').value;
    var addr = document.getElementById('address').value;

    var message = "Hi there! " + "\n" + "Your event called " + name + "\n" + " Is On " + date + " At "+ time;

    console.log(message)

    var email = document.createElement("a");
    email.href = "mailto:"+addr + "?subject=" + name + " reminder&body=" + message;
    email.click();
}


function getUTCOffset(zone) {
    if (zone === "PST") 
        { return "-08:00"
    } else if (zone === "MST") {
        return "-07:00"
    } else if (zone === "CST") {
        return "-6:00"
    } else if (zone === "AST") {
        return "-04:00"
    } else if (zone === "KST") {
        return "+09:00"
    } else if (zone === "JST") {
        return "+09:00"
    }
}

// function getUTCOffset1(zone) {
//     if (zone === "KST") {
//         return "+09:00";
//     }
//     if (zone === "A" || "Alpha Time Zone") {
//         return "+01:00"
//     }	//Alpha Time Zone
//     if (zone ==="ACDT" || "Australian Central Daylight Time" || "CDT" || "Central Daylight Time" || "CDST" || "Central Daylight Savings Time") {
//         return "+10:30";
//     }
//     if (zone === "ACST"	|| "Australian Central Standard Time"  || "CST" || "Central Standard Time") { 
//         return "+09:30";
//     }
//     if (zone === "ACT" || "Acre Time") {
//         return "-05:00";
//     }

//     // This is a special case. will investigate later.
//     if (zone === "ACT" || "Australian Central Time")	{ 
//         return "+9:30 / +10:30";
//     }

//     if (zone === "ACWST" || "Australian Central Western Standard Time") {
//         return "+08:45";
//     }

//     if (zone === "ADT"	|| "Arabia Daylight Time" || "AST "|| "Arabia Summer Time") {
//         return "+04:00"
//     }	

//     if (zone === "ADT" || "Atlantic Daylight Time" || "ADST" || "Atlantic Daylight Saving Time" || "AST" || "Atlantic Summer Time" || "HAA" || "Heure Avancée de l'Atlantique (French)") {
//         return "-03:00"
//     }

//     if (zone === "AEDT" || "Australian Eastern Daylight Time" || "EDT" || "Eastern Daylight Time" || "EDST" || "Eastern Daylight Saving Time") {
//         return "+11:00"
//     }

//     if (zone ==="AEST" || "Australian Eastern Standard Time" || "EST" || "Eastern Standard Time" || "AET" || "Australian Eastern Time"	) {
//         return "+10:00"
//     }


//     if (zone === "AET" || "Australian Eastern Time") { 
//         return "+10:00 / +11:00"
//     }

//     if (zone === "AFT" || "Afghanistan Time") { 
//         return "+04:30";
//     }

// AKDT	"Alaska Daylight Time ADST – Alaska Daylight Saving Time"	UTC -8

// AKST	"Alaska Standard Time" || "AT"|| "Alaska Time"	UTC -9

// ALMT	Alma-Ata Time	UTC +6

// AMST	Amazon Summer Time	UTC -3

// AMST	"Armenia Summer Time AMDT – Armenia Daylight Time"	UTC +5

// AMT	Amazon Time	UTC -4

// AMT	Armenia Time	UTC +4

// ANAST	Anadyr Summer Time	UTC +12

// ANAT	Anadyr Time	UTC +12

// AQTT	Aqtobe Time	UTC +5

// ART	Argentina Time	UTC -3

// AST	"Arabia Standard Time 
// AST – Arabic Standard Time
// AST – Al Manamah Standard Time"	UTC +3

// AST	"Atlantic Standard Time 
// AT – Atlantic Time 
// AST – Tiempo Estándar del Atlántico (Spanish)
// HNA – Heure Normale de l'Atlantique (French)"	UTC -4

// AT	Atlantic Time	UTC -4:00 / -3:00

// AWDT	"Australian Western Daylight Time 
// WDT – Western Daylight Time
// WST – Western Summer Time"	UTC +9

// AWST	"Australian Western Standard Time 
// WST – Western Standard Time
// WAT – Western Australia Time"	UTC +8

// AZOST	"Azores Summer Time 
// AZODT – Azores Daylight Time"	UTC +0

// AZOT	"Azores Time 
// AZOST – Azores Standard Time"	UTC -1

// AZST	Azerbaijan Summer Time	UTC +5

// AZT	Azerbaijan Time	UTC +4

// AoE	Anywhere on Earth	UTC -12

// B	Bravo Time Zone	UTC +2

// BNT	"Brunei Darussalam Time 
// BDT – Brunei Time"	UTC +8

// BOT	Bolivia Time	UTC -4

// BRST	"Brasília Summer Time 
// BST – Brazil Summer Time
// BST – Brazilian Summer Time"	UTC -2

// BRT	"Brasília Time 
// BT – Brazil Time
// BT – Brazilian Time"	UTC -3
// BST	Bangladesh Standard Time	UTC +6
// BST	Bougainville Standard Time	UTC +11
// BST	"British Summer Time 
// BDT – British Daylight Time
// BDST – British Daylight Saving Time"	UTC +1
// BTT	Bhutan Time	UTC +6
// C	Charlie Time Zone	UTC +3
// CAST	Casey Time	UTC +8
// CAT	Central Africa Time	UTC +2
// CCT	Cocos Islands Time	UTC +6:30
// CDT	"Central Daylight Time 
// CDST – Central Daylight Saving Time
// NACDT – North American Central Daylight Time 
// HAC – Heure Avancée du Centre (French)"	UTC -5
// CDT	Cuba Daylight Time	UTC -4
// CEST	"Central European Summer Time 
// CEDT – Central European Daylight Time
// ECST – European Central Summer Time 
// MESZ – Mitteleuropäische Sommerzeit (German)"	UTC +2
// CET	"Central European Time 
// ECT – European Central Time
// CET – Central Europe Time 
// MEZ – Mitteleuropäische Zeit (German)"	UTC +1
// CHADT	"Chatham Island Daylight Time 
// CDT – Chatham Daylight Time"	UTC +13:45
// CHAST	Chatham Island Standard Time	UTC +12:45
// CHOST	"Choibalsan Summer Time 
// CHODT – Choibalsan Daylight Time
// CHODST – Choibalsan Daylight Saving Time"	UTC +9
// CHOT	Choibalsan Time	UTC +8
// CHUT	Chuuk Time	UTC +10
// CIDST	Cayman Islands Daylight Saving Time	UTC -4
// CIST	"Cayman Islands Standard Time 
// CIT – Cayman Islands Time"	UTC -5
// CKT	Cook Island Time	UTC -10
// CLST	"Chile Summer Time 
// CLDT – Chile Daylight Time"	UTC -3
// CLT	"Chile Standard Time 
// CT – Chile Time
// CLST – Chile Standard Time"	UTC -4
// COT	Colombia Time	UTC -5
// CST	"Central Standard Time 
// CT – Central Time
// NACST – North American Central Standard Time 
// CST – Tiempo Central Estándar (Spanish)
// HNC – Heure Normale du Centre (French)"	UTC -6
// CST	China Standard Time	UTC +8
// CST	Cuba Standard Time	UTC -5
// CT	Central Time	UTC -6:00 / -5:00
// CVT	Cape Verde Time	UTC -1
// CXT	Christmas Island Time	UTC +7
// ChST	"Chamorro Standard Time 
// GST – Guam Standard Time"	UTC +10
// D	Delta Time Zone	UTC +4
// DAVT	Davis Time	UTC +7
// DDUT	Dumont-d'Urville Time	UTC +10
// E	Echo Time Zone	UTC +5
// EASST	"Easter Island Summer Time 
// EADT – Easter Island Daylight Time"	UTC -5
// EAST	Easter Island Standard Time	UTC -6
// EAT	"Eastern Africa Time 
// EAT – East Africa Time"	UTC +3
// ECT	Ecuador Time	UTC -5
// EDT	"Eastern Daylight Time 
// EDST – Eastern Daylight Savings Time
// NAEDT – North American Eastern Daylight Time 
// HAE – Heure Avancée de l'Est (French)
// EDT – Tiempo de verano del Este (Spanish)"	UTC -4
// EEST	"Eastern European Summer Time 
// EEDT – Eastern European Daylight Time 
// OESZ – Osteuropäische Sommerzeit (German)"	UTC +3
// EET	"Eastern European Time 
// OEZ – Osteuropäische Zeit (German)"	UTC +2
// EGST	"Eastern Greenland Summer Time 
// EGST – East Greenland Summer Time"	UTC +0
// EGT	"East Greenland Time 
// EGT – Eastern Greenland Time"	UTC -1
// EST	"Eastern Standard Time 
// ET – Eastern Time 
// NAEST – North American Eastern Standard Time 
// ET – Tiempo del Este (Spanish)
// HNE – Heure Normale de l'Est (French)"	UTC -5
// ET	Eastern Time	UTC -5:00 / -4:00
// F	Foxtrot Time Zone	UTC +6
// FET	Further-Eastern European Time	UTC +3
// FJST	"Fiji Summer Time 
// FJDT – Fiji Daylight Time"	UTC +13
// FJT	Fiji Time	UTC +12
// FKST	"Falkland Islands Summer Time 
// FKDT – Falkland Island Daylight Time"	UTC -3
// FKT	"Falkland Island Time 
// FKST – Falkland Island Standard Time"	UTC -4
// FNT	Fernando de Noronha Time	UTC -2
// G	Golf Time Zone	UTC +7
// GALT	Galapagos Time	UTC -6
// GAMT	"Gambier Time 
// GAMT – Gambier Islands Time"	UTC -9
// GET	Georgia Standard Time	UTC +4
// GFT	French Guiana Time	UTC -3
// GILT	Gilbert Island Time	UTC +12
// GMT	"Greenwich Mean Time 
// UTC – Coordinated Universal Time
// GT – Greenwich Time"	UTC +0
// GST	Gulf Standard Time	UTC +4
// GST	South Georgia Time	UTC -2
// GYT	Guyana Time	UTC -4
// H	Hotel Time Zone	UTC +8
// HDT	"Hawaii-Aleutian Daylight Time 
// HADT – Hawaii Daylight Time"	UTC -9
// HKT	Hong Kong Time	UTC +8
// HOVST	"Hovd Summer Time 
// HOVDT – Hovd Daylight Time
// HOVDST – Hovd Daylight Saving Time"	UTC +8
// HOVT	Hovd Time	UTC +7
// HST	"Hawaii Standard Time 
// HAST – Hawaii-Aleutian Standard Time"	UTC -10
// I	India Time Zone	UTC +9
// ICT	Indochina Time	UTC +7
// IDT	Israel Daylight Time	UTC +3
// IOT	Indian Chagos Time	UTC +6
// IRDT	"Iran Daylight Time 
// IRST – Iran Summer Time
// IDT – Iran Daylight Time"	UTC +4:30
// IRKST	Irkutsk Summer Time	UTC +9
// IRKT	Irkutsk Time	UTC +8
// IRST	"Iran Standard Time 
// IT – Iran Time"	UTC +3:30
// IST	"India Standard Time 
// IT – India Time
// IST – Indian Standard Time"	UTC +5:30
// IST	"Irish Standard Time 
// IST – Irish Summer Time"	UTC +1
// IST	Israel Standard Time	UTC +2
// JST	Japan Standard Time	UTC +9
// K	Kilo Time Zone	UTC +10
// KGT	Kyrgyzstan Time	UTC +6
// KOST	Kosrae Time	UTC +11
// KRAST	Krasnoyarsk Summer Time	UTC +8
// KRAT	Krasnoyarsk Time	UTC +7
// KST	"Korea Standard Time 
// KST – Korean Standard Time
// KT – Korea Time"	UTC +9
// KUYT	"Kuybyshev Time 
// SAMST – Samara Summer Time"	UTC +4
// L	Lima Time Zone	UTC +11
// LHDT	Lord Howe Daylight Time	UTC +11
// LHST	Lord Howe Standard Time	UTC +10:30
// LINT	Line Islands Time	UTC +14
// M	Mike Time Zone	UTC +12
// MAGST	"Magadan Summer Time 
// MAGST – Magadan Island Summer Time"	UTC +12
// MAGT	"Magadan Time 
// MAGT – Magadan Island Time"	UTC +11
// MART	Marquesas Time	UTC -9:30
// MAWT	Mawson Time	UTC +5
// MDT	"Mountain Daylight Time 
// MDST – Mountain Daylight Saving Time
// NAMDT – North American Mountain Daylight Time 
// HAR – Heure Avancée des Rocheuses (French)"	UTC -6
// MHT	Marshall Islands Time	UTC +12
// MMT	Myanmar Time	UTC +6:30
// MSD	"Moscow Daylight Time 
// Moscow Summer Time"	UTC +4
// MSK	"Moscow Standard Time 
// MCK – Moscow Time"	UTC +3
// MST	"Mountain Standard Time 
// MT – Mountain Time
// NAMST – North American Mountain Standard Time 
// HNR – Heure Normale des Rocheuses (French)"	UTC -7
// MT	Mountain Time	UTC -7:00 / -6:00
// MUT	Mauritius Time	UTC +4
// MVT	Maldives Time	UTC +5
// MYT	"Malaysia Time 
// MST – Malaysian Standard Time"	UTC +8
// N	November Time Zone	UTC -1
// NCT	New Caledonia Time	UTC +11
// NDT	"Newfoundland Daylight Time 
// HAT – Heure Avancée de Terre-Neuve (French)"	UTC -2:30
// NFDT	"Norfolk Daylight Time 
// NFDT – Norfolk Island Daylight Time"	UTC +12
// NFT	"Norfolk Time 
// NFT – Norfolk Island Time"	UTC +11
// NOVST	"Novosibirsk Summer Time 
// OMSST – Omsk Summer Time"	UTC +7
// NOVT	"Novosibirsk Time 
// OMST – Omsk Standard Time"	UTC +7
// NPT	Nepal Time	UTC +5:45
// NRT	Nauru Time	UTC +12
// NST	"Newfoundland Standard Time 
// HNT – Heure Normale de Terre-Neuve (French)"	UTC -3:30
// NUT	Niue Time	UTC -11
// NZDT	New Zealand Daylight Time	UTC +13
// NZST	New Zealand Standard Time	UTC +12
// O	Oscar Time Zone	UTC -2
// OMSST	"Omsk Summer Time 
// NOVST – Novosibirsk Summer Time"	UTC +7
// OMST	"Omsk Standard Time 
// OMST – Omsk Time
// NOVT – Novosibirsk Time"	UTC +6
// ORAT	Oral Time	UTC +5
// P	Papa Time Zone	UTC -3
// PDT	"Pacific Daylight Time 
// PDST – Pacific Daylight Saving Time
// NAPDT – North American Pacific Daylight Time 
// HAP – Heure Avancée du Pacifique (French)"	UTC -7
// PET	Peru Time	UTC -5
// PETST	Kamchatka Summer Time	UTC +12
// PETT	"Kamchatka Time 
// PETT – Petropavlovsk-Kamchatski Time"	UTC +12
// PGT	Papua New Guinea Time	UTC +10
// PHOT	Phoenix Island Time	UTC +13
// PHT	"Philippine Time 
// PST – Philippine Standard Time"	UTC +8
// PKT	"Pakistan Standard Time 
// PKT – Pakistan Time"	UTC +5
// PMDT	Pierre & Miquelon Daylight Time	UTC -2
// PMST	Pierre & Miquelon Standard Time	UTC -3
// PONT	Pohnpei Standard Time	UTC +11
// PST	"Pacific Standard Time 
// PT – Pacific Time
// NAPST – North American Pacific Standard Time 
// PT – Tiempo del Pacífico (Spanish)
// HNP – Heure Normale du Pacifique (French)"	UTC -8
// PST	Pitcairn Standard Time	UTC -8
// PT	Pacific Time	UTC -8:00 / -7:00
// PWT	Palau Time	UTC +9
// PYST	Paraguay Summer Time	UTC -3
// PYT	Paraguay Time	UTC -4
// PYT	"Pyongyang Time 
// PYST – Pyongyang Standard Time"	UTC +8:30
// Q	Quebec Time Zone	UTC -4
// QYZT	Qyzylorda Time	UTC +6
// R	Romeo Time Zone	UTC -5
// RET	Reunion Time	UTC +4
// ROTT	Rothera Time	UTC -3
// S	Sierra Time Zone	UTC -6
// SAKT	Sakhalin Time	UTC +11
// SAMT	"Samara Time 
// SAMT – Samara Standard Time"	UTC +4
// SAST	"South Africa Standard Time 
// SAST – South African Standard Time"	UTC +2
// SBT	"Solomon Islands Time 
// SBT – Solomon Island Time"	UTC +11
// SCT	Seychelles Time	UTC +4
// SGT	"Singapore Time 
// SST – Singapore Standard Time"	UTC +8
// SRET	Srednekolymsk Time	UTC +11
// SRT	Suriname Time	UTC -3
// SST	Samoa Standard Time	UTC -11
// SYOT	Syowa Time	UTC +3
// T	Tango Time Zone	UTC -7
// TAHT	Tahiti Time	UTC -10
// TFT	"French Southern and Antarctic Time 
// KIT – Kerguelen (Islands) Time"	UTC +5
// TJT	Tajikistan Time	UTC +5
// TKT	Tokelau Time	UTC +13
// TLT	East Timor Time	UTC +9
// TMT	Turkmenistan Time	UTC +5
// TOST	Tonga Summer Time	UTC +14
// TOT	Tonga Time	UTC +13
// TRT	Turkey Time	UTC +3
// TVT	Tuvalu Time	UTC +12
// U	Uniform Time Zone	UTC -8
// ULAST	"Ulaanbaatar Summer Time 
// ULAST – Ulan Bator Summer Time"	UTC +9
// ULAT	"Ulaanbaatar Time 
// ULAT – Ulan Bator Time"	UTC +8
// UTC	Coordinated Universal Time	UTC
// UYST	Uruguay Summer Time	UTC -2
// UYT	Uruguay Time	UTC -3
// UZT	Uzbekistan Time	UTC +5
// V	Victor Time Zone	UTC -9
// VET	"Venezuelan Standard Time 
// HLV – Hora Legal de Venezuela (Spanish)"	UTC -4
// VLAST	Vladivostok Summer Time	UTC +11
// VLAT	Vladivostok Time	UTC +10
// VOST	Vostok Time	UTC +6
// VUT	"Vanuatu Time 
// EFATE – Efate Time"	UTC +11
// W	Whiskey Time Zone	UTC -10
// WAKT	Wake Time	UTC +12
// WARST	Western Argentine Summer Time	UTC -3
// WAST	West Africa Summer Time	UTC +2
// WAT	West Africa Time	UTC +1
// WEST	"Western European Summer Time 
// WEDT – Western European Daylight Time 
// WESZ – Westeuropäische Sommerzeit (German)"	UTC +1
// WET	"Western European Time 
// GMT – Greenwich Mean Time 
// WEZ – Westeuropäische Zeit (German)"	UTC +0
// WFT	Wallis and Futuna Time	UTC +12
// WGST	"Western Greenland Summer Time 
// WGST – West Greenland Summer Time"	UTC -2
// WGT	"West Greenland Time 
// WGT – Western Greenland Time"	UTC -3
// WIB	"Western Indonesian Time 
// WIB – Waktu Indonesia Barat"	UTC +7
// WIT	"Eastern Indonesian Time 
// WIT – Waktu Indonesia Timur"	UTC +9
// WITA	"Central Indonesian Time 
// WITA – Waktu Indonesia Tengah"	UTC +8
// WST	"West Samoa Time 
// ST – Samoa Time"	UTC +13
// WST	Western Sahara Summer Time	UTC +1
// WT	"Western Sahara Standard Time 
// WT – Western Sahara Time"	UTC +0
// X	X-ray Time Zone	UTC -11
// Y	Yankee Time Zone	UTC -12
// YAKST	Yakutsk Summer Time	UTC +10
// YAKT	Yakutsk Time	UTC +9
// YAPT	Yap Time	UTC +10
// YEKST	Yekaterinburg Summer Time	UTC +6
// YEKT	Yekaterinburg Time	UTC +5
// if (zone === "Z	Zulu Time Zone	UTC +0
// if (zone === "}

// function getUTCOffset2(zone) {
//     if (zone === "ACDT" || "Australian Central Daylight Savings Time") {return "+10:30"
//     } else if (zone === "ACST" || "Australian Central Standard Time") {return "+09:30"
//     else if (zone === "ACT || "Acre Time	UTC - 5
//     else if (zone === "ACWST || "Australian Central Western Standard Time	UTC + 8: 45
//     else if (zone === "ADT || "Atlantic Daylight Time	UTC - 3
//     else if (zone === "AEDT || "Australian Eastern Daylight Savings Time	UTC + 11
//     else if (zone === "AEST || "Australian Eastern Standard Time	UTC + 10
//     else if (zone === "AFT || "Afghanistan Time	UTC + 4: 30
//     else if (zone === "AKDT || "Alaska Daylight Time	UTC - 8
//     else if (zone === "AKST || "Alaska Standard Time	UTC - 9
//     else if (zone === "AMST || "Amazon Summer Time	UTC - 3
//     else if (zone === "AMT || "Amazon Time	UTC - 4
//     else if (zone === "AMT || "Armenia Time	UTC + 4
//     else if (zone === "ART || "Argentina Time	UTC - 3
//     else if (zone === "AST || "Atlantic Standard Time	UTC - 4
//     else if (zone === "AST || "Arabia Standard Time	UTC + 3
//     else if (zone === "AT || "Atlantic Time	UTC - 4 / UTC - 3
//     else if (zone === "AWST || "Australian Western Standard Time	UTC + 8
//     else if (zone === "AZOST || "Azores Summer Time	UTC + 0
//     else if (zone === "AZOT || "Azores Standard Time	UTC - 1
//     else if (zone === "AZT || "Azerbaijan Time	UTC + 4
//     else if (zone === "BDT || "Brunei Time	UTC + 8
//     else if (zone === "BIT || "Baker Island Time	UTC - 12
//     else if (zone === "BNT || "Brunei Darussalam Time	UTC + 8
//     else if (zone === "BOT || "Bolivia Time	UTC - 4
//     else if (zone === "BRST || "Brasilia Summer Time	UTC - 2
//     else if (zone === "BRT || "Brasilia Time	UTC - 3
//     else if (zone === "BST || "British Summer Time	UTC + 1
//     else if (zone === "BST || "Bangladesh Standard Time	UTC + 6
//     else if (zone === "BST || "Bougainville Standard Time	UTC + 11
//     else if (zone === "BTT || "Bhutan Time	UTC + 6
//     else if (zone === "CAT || "Central Africa Time	UTC + 2
//     else if (zone === "CCT || "Cocos Islands Time	UTC + 6: 30
//     else if (zone === "CDT || "Central Daylight Time	UTC - 5
//     else if (zone === "CDT || "Cuba Daylight Time	UTC - 4
//     else if (zone === "CEST || "Central European Summer Time	UTC + 2
//     else if (zone === "CET || "Central European Time	UTC + 1
//     else if (zone === "CHADT || "Chatham Daylight Time	UTC + 13: 45
//     else if (zone === "CHAST || "Chatham Standard Time	UTC + 12: 45
//     else if (zone === "CHOST || "Choibalsan Summer Time	UTC + 9
//     else if (zone === "CHOT || "Choibalsan Standard Time	UTC + 8
//     else if (zone === "CHST || "Chamorro Standard Time	UTC + 10
//     else if (zone === "CHUT || "Chuuk Time	UTC + 10
//     else if (zone === "CIST || "Clipperton Island Standard Time	UTC - 8
//     else if (zone === "CIT || "Central Indonesia Time	UTC + 8
//     else if (zone === "CKT || "Cook Island Time	UTC - 10
//     else if (zone === "CLST || "Chile Summer Time	UTC - 3
//     else if (zone === "CLT || "Chile Standard Time	UTC - 4
//     else if (zone === "COST || "Colombia Summer Time	UTC - 4
//     else if (zone === "COT || "Colombia Time	UTC - 5
//     else if (zone === "CST || "Central Standard Time	UTC - 6
//     else if (zone === "CST || "Cuba Standard Time	UTC - 5
//     else if (zone === "CST || "China Standard Time	UTC + 8
//     else if (zone === "CT || "Central Time	UTC - 6 / UTC - 5
//     else if (zone === "CVT || "Cape Verde Time	UTC - 1
//     else if (zone === "CWST || "Central Western Standard Time	UTC + 8: 45
//     else if (zone === "CXT || "Christmas Island Time	UTC + 7
//     else if (zone === "DAVT || "Davis Time	UTC + 7
//     else if (zone === "DDUT || "Dumont d'Urville Time	UTC+10
//     else if (zone === "EASST || "Easter Island Summer Time	UTC - 5
//     else if (zone === "EAST || "Easter Island Standard Time	UTC - 6
//     else if (zone === "EAT || "East Africa Time	UTC + 3
//     else if (zone === "ECT || "Ecuador Time	UTC - 5
//     else if (zone === "EDT || "Eastern Daylight Time	UTC - 4
//     else if (zone === "EEST || "Eastern European Summer Time	UTC + 3
//     else if (zone === "EET || "Eastern European Time	UTC + 2
//     else if (zone === "EGST || "Eastern Greenland Summer Time	UTC + 0
//     else if (zone === "EGT || "Eastern Greenland Time	UTC - 1
//     else if (zone === "EIT || "Eastern Indonesian Time	UTC + 9
//     else if (zone === "EST || "Eastern Standard Time	UTC - 5
//     else if (zone === "ET || "Eastern Time	UTC - 5 / UTC - 4
//     else if (zone === "FET || "Further - eastern European Time	UTC + 3
//     else if (zone === "FJT || "Fiji Time	UTC + 12
//     else if (zone === "FKST || "Falkland Islands Summer Time	UTC - 3
//     else if (zone === "FKT || "Falkland Islands Time	UTC - 4
//     else if (zone === "FNT || "Fernando de Noronha Time	UTC - 2
//     else if (zone === "GALT || "Galapagos Time	UTC - 6
//     else if (zone === "GAMT || "Gambier Islands	UTC - 9
//     else if (zone === "GET || "Georgia Standard Time	UTC + 4
//     else if (zone === "GFT || "French Guiana Time	UTC - 3
//     else if (zone === "GILT || "Gilbert Island Time	UTC + 12
//     else if (zone === "GIT || "Gambier Island Time	UTC - 9
//     else if (zone === "GMT || "Greenwich Mean Time	UTC + 0
//     else if (zone === "GST || "Gulf Standard Time	UTC + 4
//     else if (zone === "GST || "South Georgia Time	UTC - 2
//     else if (zone === "GYT || "Guyana Time	UTC - 4
//     else if (zone === "HADT || "Hawaii - Aleutian Daylight Time	UTC - 9
//     else if (zone === "HAST || "Hawaii - Aleutian Standard Time	UTC - 10
//     else if (zone === "HKT || "Hong Kong Time	UTC + 8
//     else if (zone === "HMT || "Heard and McDonald Islands Time	UTC + 5
//     else if (zone === "HOVST || "Khovd Summer Time	UTC + 8
//     else if (zone === "HOVT || "Khovd Standard Time	UTC + 7
//     else if (zone === "ICT || "Indochina Time	UTC + 7
//     else if (zone === "IDT || "Israel Daylight Time	UTC + 3
//     else if (zone === "IOT || "Indian Chagos Time	UTC + 6
//     else if (zone === "IRDT || "Iran Daylight Time	UTC + 4: 30
//     else if (zone === "IRKT || "Irkutsk Time	UTC + 8
//     else if (zone === "IRST || "Iran Standard Time	UTC + 3: 30
//     else if (zone === "IST || "Indian Standard Time	UTC + 5: 30
//     else if (zone === "IST || "Irish Standard Time	UTC + 1
//     else if (zone === "IST || "Israel Standard Time	UTC + 2
//     else if (zone === "JST || "Japan Standard Time	UTC + 9
//     else if (zone === "KGT || "Kyrgyzstan time	UTC + 6
//     else if (zone === "KOST || "Kosrae Time	UTC + 11
//     else if (zone === "KRAT || "Krasnoyarsk Time	UTC + 7
//     else if (zone === "KST || "Korea Standard Time	UTC + 9
//     else if (zone === "LHDT || "Lord Howe Daylight Time	UTC + 11
//     else if (zone === "LHST || "Lord Howe Standard Time	UTC + 10: 30
//     else if (zone === "LINT || "Line Islands Time	UTC + 14
//     else if (zone === "MAGT || "Magadan Time	UTC + 11
//     else if (zone === "MART || "Marquesas Islands Time	UTC - 9: 30
//     else if (zone === "MAWT || "Mawson Station Time	UTC + 5
//     else if (zone === "MDT || "Mountain Daylight Time	UTC - 6
//     else if (zone === "MHT || "Marshall Islands	UTC + 12
//     else if (zone === "MIST || "Macquarie Island Station Time	UTC + 11
//     else if (zone === "MIT || "Marquesas Islands Time	UTC - 9: 30
//     else if (zone === "MMT || "Myanmar Standard Time	UTC + 6: 30
//     else if (zone === "MSK || "Moscow Time	UTC + 3
//     else if (zone === "MST || "Mountain Standard Time	UTC - 7
//     else if (zone === "MST || "Malaysia Standard Time	UTC + 8
//     else if (zone === "MT || "Mountain Time	UTC - 7 / UTC - 6
//     else if (zone === "MUT || "Mauritius Time	UTC + 4
//     else if (zone === "MVT || "Maldives Time	UTC + 5
//     else if (zone === "MYT || "Malaysia Time	UTC + 8
//     else if (zone === "NCT || "New Caledonia Time	UTC + 11
//     else if (zone === "NDT || "Newfoundland Daylight Time	UTC - 2: 30
//     else if (zone === "NFT || "Norfolk Time	UTC + 11
//     else if (zone === "NPT || "Nepal Time	UTC + 5: 45
//     else if (zone === "NRT || "Nauru Time	UTC + 12
//     else if (zone === "NST || "Newfoundland Standard Time	UTC - 3: 30
//     else if (zone === "NT || "Newfoundland Time	UTC - 3: 30
//     else if (zone === "NUT || "Niue Time	UTC - 11
//     else if (zone === "NZDT || "New Zealand Daylight Time	UTC + 13
//     else if (zone === "NZST || "New Zealand Standard Time	UTC + 12
//     else if (zone === "OMST || "Omsk Time	UTC + 6
//     else if (zone === "ORAT || "Oral Time	UTC + 5
//     else if (zone === "PDT || "Pacific Daylight Time	UTC - 7
//     else if (zone === "PET || "Peru Time	UTC - 5
//     else if (zone === "PETT || "Kamchatka Time	UTC + 12
//     else if (zone === "PGT || "Papua New Guinea Time	UTC + 10
//     else if (zone === "PHOT || "Phoenix Island Time	UTC + 13
//     else if (zone === "PhST || "Philippine Standard Time	UTC + 8
//     else if (zone === "PHT || "Philippine Time	UTC + 8
//     else if (zone === "PKT || "Pakistan Standard Time	UTC + 5
//     else if (zone === "PMDT || "Saint Pierre and Miquelon Daylight time	UTC - 2
//     else if (zone === "PMST || "Saint Pierre and Miquelon Standard Time	UTC - 3
//     else if (zone === "PONT || "Pohnpei Standard Time	UTC + 11
//     else if (zone === "PST || "Pacific Standard Time	UTC - 8
//     else if (zone === "PT || "Pacific Time	UTC - 8 / UTC - 7
//     else if (zone === "PWT || "Palau Time	UTC + 9
//     else if (zone === "PYST || "Paraguay Summer Time	UTC - 3
//     else if (zone === "PYT || "Paraguay Time	UTC - 4
//     else if (zone === "RET || "Réunion Time	UTC + 4
//     else if (zone === "ROTT || "Rothera Research Station Time	UTC - 3
//     else if (zone === "SAKT || "Sakhalin Island time	UTC + 11
//     else if (zone === "SAMT || "Samara Time	UTC + 4
//     else if (zone === "SAST || "South African Standard Time	UTC + 2
//     else if (zone === "SBT || "Solomon Islands Time	UTC + 11
//     else if (zone === "SCT || "Seychelles Time	UTC + 4
//     else if (zone === "SGT || "Singapore Time	UTC + 8
//     else if (zone === "SLST || "Sri Lanka Standard Time	UTC + 5: 30
//     else if (zone === "SRET || "Srednekolymsk Time	UTC + 11
//     else if (zone === "SRT || "Suriname Time	UTC - 3
//     else if (zone === "SST || "Samoa Standard Time	UTC - 11
//     else if (zone === "SYOT || "Showa Station Time	UTC + 3
//     else if (zone === "TAHT || "Tahiti Time	UTC - 10
//     else if (zone === "TFT || "French Southern and Antarctic Time	UTC + 5
//     else if (zone === "THA || "Thailand Standard Time	UTC + 7
//     else if (zone === "TJT || "Tajikistan Time	UTC + 5
//     else if (zone === "TKT || "Tokelau Time	UTC + 13
//     else if (zone === "TLT || "Timor Leste Time	UTC + 9
//     else if (zone === "TMT || "Turkmenistan Time	UTC + 5
//     else if (zone === "TOT || "Tonga Time	UTC + 13
//     else if (zone === "TRT || "Turkey Time	UTC + 3
//     else if (zone === "TVT || "Tuvalu Time	UTC + 12
//     else if (zone === "ULAST || "Ulaanbaatar Summer Time	UTC + 9
//     else if (zone === "ULAT || "Ulaanbaatar Standard Time	UTC + 8
//     else if (zone === "USZ1 || "Kaliningrad Time	UTC + 2
//     else if (zone === "UTC || "Coordinated Universal Time	UTC
//     else if (zone === "UYST || "Uruguay Summer Time	UTC - 2
//     else if (zone === "UYT || "Uruguay Standard Time	UTC - 3
//     else if (zone === "UZT || "Uzbekistan Time	UTC + 5
//     else if (zone === "VET || "Venezuelan Standard Time	UTC - 4
//     else if (zone === "VLAT || "Vladivostok Time	UTC + 10
//     else if (zone === "VOLT || "Volgograd Time	UTC + 4
//     else if (zone === "VOST || "Vostok Station Time	UTC + 6
//     else if (zone === "VUT || "Vanuatu Time	UTC + 11
//     else if (zone === "WAKT || "Wake Island Time	UTC + 12
//     else if (zone === "WAST || "West Africa Summer Time	UTC + 2
//     else if (zone === "WAT || "West Africa Time	UTC + 1
//     else if (zone === "WEST || "Western European Summer Time	UTC + 1
//     else if (zone === "WET || "Western European Time	UTC + 0
//     else if (zone === "WFT || "Wallis and Futuna Time	UTC + 12
//     else if (zone === "WGST || "West Greenland Time	UTC - 3
//     else if (zone === "WGST || "West Greenland Summer Time	UTC - 2
//     else if (zone === "WIB || "Western Indonesia Time	UTC + 7
//     else if (zone === "WIT || "Eastern Indonesia Time	UTC + 9
//     else if (zone === "WST || "Western Standard Time	UTC + 8
//     else if (zone === "YAKT || "Yakutsk Time	UTC + 9
//     else if (zone === "YKT" || "Yekaterinburg Time") {return "+05:00"}
// }