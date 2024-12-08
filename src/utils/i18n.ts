export const languages = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧'
  },
  sv: {
    code: 'sv',
    name: 'Svenska',
    flag: '🇸🇪'
  }
} as const;

export const translations = {
  en: {
    app: {
      title: 'Reading Assistant',
      selectUser: 'Select a user to start',
      selectUserSubtext: 'Choose or create a user profile to begin reading',
      selectText: 'Select a text to start reading',
      selectTextSubtext: 'Choose from your uploaded materials to begin a reading session'
    },
    upload: {
      title: 'Upload Text',
      dragDrop: 'Drag and drop your file here, or',
      browse: 'browse',
      supports: 'Supports DOCX and TXT files'
    },
    reading: {
      materials: 'Reading Materials',
      noMaterials: 'No reading materials yet',
      startReading: 'Start Reading',
      stopReading: 'Stop Reading',
      listening: 'Listening...',
      assessment: 'Reading Assessment',
      accuracy: 'Reading Accuracy',
      questions: 'Comprehension Questions'
    },
    user: {
      profile: 'User Profile',
      noUsers: 'No users yet',
      addNew: 'Add New User',
      name: 'Name',
      age: 'Age',
      language: 'Preferred Language',
      enterName: 'Enter name',
      enterAge: 'Enter age',
      add: 'Add User',
      cancel: 'Cancel'
    }
  },
  sv: {
    app: {
      title: 'Läsassistent',
      selectUser: 'Välj en användare för att börja',
      selectUserSubtext: 'Välj eller skapa en användarprofil för att börja läsa',
      selectText: 'Välj en text att läsa',
      selectTextSubtext: 'Välj bland dina uppladdade material för att börja en lässession'
    },
    upload: {
      title: 'Ladda upp text',
      dragDrop: 'Dra och släpp din fil här, eller',
      browse: 'bläddra',
      supports: 'Stödjer DOCX och TXT filer'
    },
    reading: {
      materials: 'Läsmaterial',
      noMaterials: 'Inga läsmaterial än',
      startReading: 'Börja läsa',
      stopReading: 'Sluta läsa',
      listening: 'Lyssnar...',
      assessment: 'Läsbedömning',
      accuracy: 'Läsnoggrannhet',
      questions: 'Förståelsefrågor'
    },
    user: {
      profile: 'Användarprofil',
      noUsers: 'Inga användare än',
      addNew: 'Lägg till ny användare',
      name: 'Namn',
      age: 'Ålder',
      language: 'Föredraget språk',
      enterName: 'Ange namn',
      enterAge: 'Ange ålder',
      add: 'Lägg till användare',
      cancel: 'Avbryt'
    }
  }
} as const;