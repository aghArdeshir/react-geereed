// thanks to https://www.name-generator.org.uk
const mockNames = ["Willie", "Bella (Belle)", "Phoebe", "Yasmin", "Adele", "Lillie (Lily)", "Zainab", "Eve", "Betty (Telsa)", "Susan (Sue)", "Zaynab", "Kiara", "Crystal", "Tia", "Jesse", "Anya", "Ebony", "Aaliyah", "Hannah", "Aliya", "Morgan", "Cerys", "Kyla", "Mariam (Mitzi)", "Amanda (Mandi)", "Sinead", "Claudia", "April", "Amirah", "Teresa (Tess)", "Florence", "Rowan", "Agnes (Berry)", "Zoe", "Tommy", "Zoya", "Orla", "Ellis", "Alyssa", "Alicia", "Antonia (Tonya)", "Mae", "Isobelle", "Kiera", "Rosie", "Hanna", "Amira", "Savannah", "Jessie", "Ava", "Christina (Christi)", "Gabriella", "Martha", "Cara", "Mia", "Annabel", "Troy", "Carla (Karly)", "Erica", "Maya", "Ciaran", "Helen (Lena)", "Louise (Loulou)", "Amina", "Hayley (Halle)", "Diana", "Lola", "Nadia", "Tyler", "Mya", "Francesca (Fani)", "Elizabeth (Liz)", "Meghan", "Mason", "Lisa", "Fatima", "Heidi (Ada)", "Tiffany", "Traci", "Shane", "Maria (Mimi)", "Olive (Lyvia)", "Sara", "Tina", "Alfie", "Ayesha", "Joanne (Jo)", "Katelyn (Cait)", "Katie (Kat)", "Evie", "Rosa", "Ellie", "Fern", "Mollie", "Esme", "Jessica (Jessie)", "Ellen (Ellia)", "Tanisha", "Esther (Hester)", "Grace"];
const mockLastNames = ["Hayes", "Valdez", "Mejia", "Phillips", "Ruiz", "Taylor", "Leonard", "Mendez", "Gibbons", "Stephens", "Lawrence", "Warren", "Day", "Ward", "Miles", "Becker", "Berry", "Fitzgerald", "Tran", "Gill", "Molina", "Moran", "George", "Chavez", "Elliott", "Ingram", "Sharp", "Newman", "Wheeler", "Chadwick", "Padilla", "Brown", "Wong", "Spencer", "Lynch", "Howarth", "Collins", "Johnson", "Mendoza", "Herrera", "Cooper", "Zimmerman", "Booth", "Ross", "Brooks", "Rios", "Robinson", "Castillo", "Howells", "Malone", "Marsh", "Williamson", "Carey", "Jackson", "Garner", "Byrd", "Dawson", "Harris", "Clark", "Barber", "Ray", "Daniels", "Hicks", "Howard", "Doyle", "Meyer", "Cunningham", "Robles", "Mckinney", "Reynolds", "Adkins", "Fox", "Stephenson", "Robertson", "Dennis", "Jensen", "Castro", "Campbell", "Holmes", "Shelton", "Duran", "Adams", "Snyder", "Hodges", "Bond", "Hartley", "Young", "Lopez", "Li", "Townsend", "Parsons", "Avila", "Frazier", "Barlow", "Miller"];

export function randomName() {
    return mockNames[getRandom(mockNames.length)];
}

export function randomLastName() {
    return mockLastNames[getRandom(mockLastNames.length)];
}

export function getRandom(max: number): number {
    return Math.floor(Math.random() * max);
}