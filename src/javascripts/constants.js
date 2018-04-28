import cuid from "cuid";


export const assignments = {
    assignments: [
      { name: "Wordplay", url: "/wordplay", configUrl: 'configWordplay', id: cuid() },
      { name: "Story and picture", url: "/storypicture", configUrl: '/configStorypicture', id: cuid() }
    ]
  }
