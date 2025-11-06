export type Lang = "fr" | "en" | "de" | "it";
export const ALL_LANGS: Lang[] = ["fr", "en", "de", "it"];
export const defaultLang: Lang = "fr";

type Dict = Record<string, string>;

export const dictionaries: Record<Lang, Dict> = {
  fr: {
    brand: "SkiBnB",
    nav_login: "Connexion",
    // Search bar
    search_destination_label: "Destination",
    search_destination_ph: "Station, ex: Val Thorens",
    search_arrival: "Arrivée",
    search_departure: "Départ",
    search_guests: "Personnes",
    search_cta: "Rechercher",
    nav_apartments: "Appartements",
    nav_chalets: "Chalets",
    home_title: "Trouvez votre hébergement au ski",
    // Auth shared
    auth_logo: "SB",
    auth_or: "ou",
    // Login
    login_title: "Connexion",
    login_subtitle: "Accédez à votre compte SkiBnB",
    login_email: "Email",
    login_password: "Mot de passe",
    login_remember: "Se souvenir de moi",
    login_forgot: "Mot de passe oublié ?",
    login_submit: "Se connecter",
    login_no_account: "Pas de compte ?",
    login_to_register: "Créer un compte",
    // Register
    register_title: "Créer un compte",
    register_subtitle: "Rejoignez SkiBnB en quelques secondes",
    register_firstname: "Prénom",
    register_lastname: "Nom",
    register_email: "Email",
    register_password: "Mot de passe",
    register_confirm: "Confirmer le mot de passe",
    register_terms: "J’accepte les Conditions d’utilisation et la Politique de confidentialité.",
    register_submit: "Créer mon compte",
    register_have_account: "Déjà un compte ?",
    register_to_login: "Se connecter",
  },

  en: {
    brand: "SkiBnB",
    nav_login: "Sign in",
    // Search bar
    search_destination_label: "Destination",
    search_destination_ph: "Resort, e.g. Val Thorens",
    search_arrival: "Check-in",
    search_departure: "Check-out",
    search_guests: "Guests",
    search_cta: "Search",
    // Auth shared
    auth_logo: "SB",
    auth_or: "or",
    // Login
    login_title: "Sign in",
    login_subtitle: "Access your SkiBnB account",
    login_email: "Email",
    login_password: "Password",
    login_remember: "Remember me",
    login_forgot: "Forgot password?",
    login_submit: "Sign in",
    login_no_account: "No account?",
    login_to_register: "Create one",
    // Register
    register_title: "Create account",
    register_subtitle: "Join SkiBnB in seconds",
    register_firstname: "First name",
    register_lastname: "Last name",
    register_email: "Email",
    register_password: "Password",
    register_confirm: "Confirm password",
    register_terms: "I accept the Terms of Service and the Privacy Policy.",
    register_submit: "Create my account",
    register_have_account: "Already have an account?",
    register_to_login: "Sign in",
  },

  de: {
    brand: "SkiBnB",
    nav_login: "Anmelden",
    // Search bar
    search_destination_label: "Reiseziel",
    search_destination_ph: "Ort, z. B. Val Thorens",
    search_arrival: "Anreise",
    search_departure: "Abreise",
    search_guests: "Personen",
    search_cta: "Suchen",
    // Auth shared
    auth_logo: "SB",
    auth_or: "oder",
    // Login
    login_title: "Anmelden",
    login_subtitle: "Greife auf dein SkiBnB-Konto zu",
    login_email: "E-Mail",
    login_password: "Passwort",
    login_remember: "Angemeldet bleiben",
    login_forgot: "Passwort vergessen?",
    login_submit: "Anmelden",
    login_no_account: "Kein Konto?",
    login_to_register: "Konto erstellen",
    // Register
    register_title: "Konto erstellen",
    register_subtitle: "Tritt SkiBnB in Sekunden bei",
    register_firstname: "Vorname",
    register_lastname: "Nachname",
    register_email: "E-Mail",
    register_password: "Passwort",
    register_confirm: "Passwort bestätigen",
    register_terms: "Ich akzeptiere die Nutzungsbedingungen und die Datenschutzrichtlinie.",
    register_submit: "Konto erstellen",
    register_have_account: "Schon ein Konto?",
    register_to_login: "Anmelden",
  },

  it: {
    brand: "SkiBnB",
    nav_login: "Accedi",
    // Search bar
    search_destination_label: "Destinazione",
    search_destination_ph: "Località, es. Val Thorens",
    search_arrival: "Arrivo",
    search_departure: "Partenza",
    search_guests: "Persone",
    search_cta: "Cerca",
    // Auth shared
    auth_logo: "SB",
    auth_or: "oppure",
    // Login
    login_title: "Accedi",
    login_subtitle: "Accedi al tuo account SkiBnB",
    login_email: "Email",
    login_password: "Password",
    login_remember: "Ricordami",
    login_forgot: "Password dimenticata?",
    login_submit: "Accedi",
    login_no_account: "Non hai un account?",
    login_to_register: "Creane uno",
    // Register
    register_title: "Crea account",
    register_subtitle: "Unisciti a SkiBnB in pochi secondi",
    register_firstname: "Nome",
    register_lastname: "Cognome",
    register_email: "Email",
    register_password: "Password",
    register_confirm: "Conferma password",
    register_terms: "Accetto i Termini di servizio e l’Informativa sulla privacy.",
    register_submit: "Crea il mio account",
    register_have_account: "Hai già un account?",
    register_to_login: "Accedi",
  },
};
