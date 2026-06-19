import { Movie, Artifact, Demon, TimelineEvent, GalleryItem } from './types';
import theNunPoster from "./assets/images/movies/the-nun.jpg";
import annabelleCreationPoster from './assets/images/movies/annabelle-creation.jpg';
import annabellePoster from './assets/images/movies/annabelle.jpg';
import conjuringPoster from './assets/images/movies/the-conjuring.jpg';
import conjuring2Poster from './assets/images/movies/the-conjuring-2.jpg';
import devilPoster from './assets/images/movies/devil-made-me-do-it.jpg';

import valakImage from './assets/images/demons/valak.jpg';
import bathshebaImage from './assets/images/demons/bathsheba.jpg';
import crookedManImage from './assets/images/demons/crooked-man.jpg';
import ferrymanImage from './assets/images/demons/ferryman.jpg';

import annabelleArtifact from './assets/images/artifacts/annabelle-doll.jpg';
import musicBoxArtifact from './assets/images/artifacts/music-box.jpg';
import valakPaintingArtifact from './assets/images/artifacts/valak-painting.jpg';
import crookedManArtifact from './assets/images/artifacts/crooked-man-artifact.jpg';
export const moviesData: Movie[] = [
  {
    id: 'the-nun',
    title: 'The Nun',
    year: 2018,
    tagline: 'Abbeys hold secrets. Silence is an escape, not a cure.',
    story: 'In 1952, a young nun at a cloistered abbey in Romania takes her own life. A priest with a haunted past and a novitiate on the threshold of her final vows are sent by the Vatican to investigate. Together they uncover the order\'s unholy secret, confronting a malevolent force in the form of a demonic nun.',
    poster: theNunPoster,
    characters: ['Sister Irene', 'Father Burke', 'Frenchie', 'The Nun (Valak)'],
    demonInvolved: 'Valak',
    gallery: [
      'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/pzD9zGcUNrw',
    keyEvents: [
      'The hanging at Cârța Monastery doors.',
      'Father Burke buried alive by Valak\'s trick.',
      'Sister Irene\'s blood covenant sealing blessing.'
    ],
    connections: 'Directly influences the haunting of Frenchie, which eventually leads directly to Ed and Lorraine Warren’s exorcism case files shown 20 years later in the opening of The Conjuring.'
  },
  {
    id: 'annabelle-creation',
    title: 'Annabelle: Creation',
    year: 2017,
    tagline: 'Witness the inception of the conduit.',
    story: 'Several years after the tragic death of their little girl, a dollmaker and his wife welcome a nun and several girls from a shuttered orphanage into their home. They soon become the target of the dollmaker\'s possessed creation, Annabelle, who seeks a human host to satisfy its demonic thirst.',
    poster: annabelleCreationPoster,
    characters: ['Janice / Annabelle Higgins', 'Linda', 'Samuel Mullins', 'Sister Charlotte'],
    demonInvolved: 'The Ram Demon (Mullins Curse)',
    gallery: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?auto=format&fit=crop&w=400&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/KisPhy7T__Q',
    keyEvents: [
      'Janice discovering the locked closet containing the porcelain doll.',
      'The scarecrow mutation in the night barn.',
      'The tragic death of the Mullins couple within their bedroom sanctuary.'
    ],
    connections: 'Reveals how the doll became a conduit for the Ram Demon, and bridges directly to the opening scene of the original Annabelle movie, where Janice grows up to join a satanic cult and attacks her adoptive family.'
  },
  {
    id: 'annabelle',
    title: 'Annabelle',
    year: 2014,
    tagline: 'Before The Conjuring, there was Annabelle.',
    story: 'John Form has found the perfect gift for his expectant wife, Mia - a beautiful, rare vintage doll in a pure white wedding dress. But Mia\'s delight with Annabelle doesn\'t last long. On one horrific night, their home is invaded by members of a satanic cult, who violently attack the couple. The spilt blood and satanic ritual trigger the awakening of a horrific parasite.',
    poster: annabellePoster,
    characters: ['Mia Form', 'John Form', 'Evelyn', 'Father Perez'],
    demonInvolved: 'The Ram Parasite',
    gallery: [
      'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/t9t9m4gX6I4',
    keyEvents: [
      'Cult murder in the nursery bedroom room next door.',
      'The basement elevator trapping Mia as shadows crawl.',
      'Evelyn\'s ultimate sacrifice to protect baby Leah.'
    ],
    connections: 'Explains the immediate curse of the doll that lands it in the hands of two nursing students, who subsequently request Ed and Lorraine Warren to intervene.'
  },
  {
    id: 'the-conjuring',
    title: 'The Conjuring',
    year: 2013,
    tagline: 'Based on the true case files of the Warrens.',
    story: 'In 1971, paranormal investigators Ed and Lorraine Warren are called to Rhode Island to assist the Perron family. Roger and Carolyn Perron and their five daughters have recently moved into a secluded farmhouse, only to realize a dark, murderous presence is hunting them. Ed and Lorraine must marshal their courage and skills to banish an ancient witchcraft curse.',
    poster: conjuringPoster,
    characters: ['Ed Warren', 'Lorraine Warren', 'Carolyn Perron', 'Roger Perron', 'Bathsheba Sherman'],
    demonInvolved: 'Bathsheba Sherman',
    gallery: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/k10ETZ42q5o',
    keyEvents: [
      'Clap-and-Hide games in the hollow hallways.',
      'The bedroom wardrobe haunting that falls upon the girls.',
      'The basement exorcism where Lorraine visualizes Carolyn\'s love breaking the curse.'
    ],
    connections: 'The definitive catalyst that established Ed and Lorraine Warren\'s reputation in the eyes of the public and catalyzed the creation of their Occult Museum backroom.'
  },
  {
    id: 'the-conjuring-2',
    title: 'The Conjuring 2',
    year: 2016,
    tagline: 'The supreme haunting of Enfield, London.',
    story: 'In 1977, Ed and Lorraine Warren travel to Enfield, North London, to investigate a severe poltergeist case. A single mother, Peggy Hodgson, and her four children—especially 11-year-old Janet—are being tormented by an old man\'s spirit. As the Warrens attempt to prove the hoax coordinates, Lorraine discovers that a deeper demon, Valak, is pulling the strings from the shadows.',
    poster: conjuring2Poster,
    characters: ['Ed Warren', 'Lorraine Warren', 'Janet Hodgson', 'Peggy Hodgson', 'The Crooked Man'],
    demonInvolved: 'Valak / Bill Wilkins',
    gallery: [
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?auto=format&fit=crop&w=400&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/VFsmuRPClr4',
    keyEvents: [
      'Janet talking in Bill Wilkins\' deep, raspy, geriatric voice.',
      'The Crooked Man manifesting from the toy zoetrope spinning.',
      'Ed clinging to a water pipe above a splintered tree stump in the courtyard.'
    ],
    connections: 'Chronicles the full manifestation of Valak, revealing Lorraine Warren’s personal premonitions of Ed’s demise and showcasing the Crooked Man toy which is later placed in their locked vault.'
  },
  {
    id: 'the-devil-made-me-do-it',
    title: 'The Conjuring: The Devil Made Me Do It',
    year: 2021,
    tagline: 'A shocking story of terror, murder, and unknown evil.',
    story: 'Ed and Lorraine Warren investigate a chilling story of terror, murder, and occult forces that shocked even experienced real-life paranormal investigators. For the first time in U.S. history, a murder suspect would claim demonic possession as a legal defense for manslaughter, forcing the Warrens to trace demonic witch marks across town.',
    poster: devilPoster,
    characters: ['Ed Warren', 'Lorraine Warren', 'Arne Cheyenne Johnson', 'David Glatzel', 'The Occultist'],
    demonInvolved: 'The Occultist\'s Totem Demon',
    gallery: [
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=400&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/h9Q4zZsOP1U',
    keyEvents: [
      'David Glatzel’s waterbed horror jump.',
      'The dog-kennels attack on Arne Johnson.',
      'Tracing Witch Totems beneath the Occultist\'s subterranean altar.'
    ],
    connections: 'Exposes how demonic curses can be summoned with active talismans, introducing dynamic witch covens rather than traditional isolated hauntings.'
  }
];

export const artifactsData: Artifact[] = [
  {
    id: 'annabelle',
    name: 'Annabelle Rag Doll',
    imageUrl: annabelleArtifact,
    hoverSound: 'giggle',
    description: 'A benign-looking Raggedy Ann doll bound by a malevolent demonic parasite. It serves as an active structural anchor for dark spirits.',
    history: 'Gifted to nursing students in 1970. Mediums originally claimed it contained the spirit of a child named Annabelle Higgins, but the Warrens proved it was an inhuman presence searching for a biological host. It is currently locked in a sacred glass display blessed by standard Catholic litany.',
    movieAppearances: ['The Conjuring', 'Annabelle', 'Annabelle: Creation', 'Annabelle Comes Home'],
    dangerLevel: 'EXTREME'
  },
  {
    id: 'music-box',
    name: 'Perron Family Music Box',
    imageUrl: musicBoxArtifact,
    hoverSound: 'melody',
    description: 'A round vintage spiral music box containing spiral mirror panels that project geometric lights when spun.',
    history: 'Found during the Harrisville Barn Haunting of 1971. Inhabitants would hear a sweet, hollow, mechanical melody floating through the hallway shortly before seeing a spectral child standing behind them. Lorraine Warren used its reflective backing to glimpse residual spiritual outlines.',
    movieAppearances: ['The Conjuring'],
    dangerLevel: 'HIGH'
  },
  {
    id: 'valak-painting',
    name: 'The Valak Portrait',
    imageUrl: valakPaintingArtifact,
    hoverSound: 'growl',
    description: 'A terrifying dark oil painting commissioned by Ed Warren of his recurring post-apocalyptic nightmares.',
    history: 'Ed painted this grim image in 1976 after returning from the Amityville murder house. During the Enfield investigations, the painting became a kinetic focus point through which Valak stalked Lorraine in her study, casting a shadow that matched the oil canvas perfectly.',
    movieAppearances: ['The Conjuring 2', 'The Nun'],
    dangerLevel: 'EXTREME'
  },
  {
    id: 'crooked-man',
    name: 'The Crooked Man Zoetrope',
    imageUrl: crookedManArtifact,
    hoverSound: 'bells',
    description: 'An old brass toy cylinder displaying animation slides of a twisted stick-thin tall man.',
    history: 'Recovered from Peggy Hodgson\'s children in Enfield, 1977. When the hand-cranked zoetrope was spun, the nursery rhyme of the Crooked Man would play, summoning an extremely tall, distorted entity that spoke with severe disjointed mechanical strides.',
    movieAppearances: ['The Conjuring 2'],
    dangerLevel: 'HIGH'
  }
];

export const demonsData: Demon[] = [
  {
    id: 'valak',
    name: 'Valak (The Defiler)',
    origin: 'An ancient High Duke of Hell who masquerades as a pious nun to mock the faith of their victims and bypass holy wards.',
    history: 'Constructed as a blasphemous entity trapped in Romanian monastic vaults under a medieval blood seals covenant. Unleashed by stray bombing during WWII, Valak eventually stalked the Warrens across continents to deliver curses.',
    abilities: ['Sacrilegious mimicry', 'Spectral spatial distortion', 'Shadow manipulation', 'Clairvoyance negation'],
    victims: ['Sister Victoria', 'Father Burke (harassed)', 'Frenchie (Maurice)', 'Janet Hodgson'],
    moviesAppearedIn: ['The Conjuring 2', 'The Nun', 'The Nun II', 'Annabelle: Creation (cameo)'],
    threatLevel: 'EXTREME',
    imageUrl: valakImage
  },
  {
    id: 'bathsheba',
    name: 'Bathsheba Sherman',
    origin: 'A 19th-century relative of Mary Towne Eastey, a Salem witch who swore allegiance to Satan and cursed her lands.',
    history: 'In 1863, Bathsheba sacrificed her newborn infant and hanged herself from the farmsteds giant Oak Tree, crying out curses upon any individuals who dared to build upon or possess her soil. She possesses maternal figures, forcing them to commit infanticide.',
    abilities: ['Maternal possession', 'Physical poltergeist telekinesis', 'Solfato-acidic decay projection'],
    victims: ['Carolyn Perron', 'Walker family members', 'Sheryl Higgins'],
    moviesAppearedIn: ['The Conjuring'],
    threatLevel: 'HIGH',
    imageUrl: bathshebaImage
  },
  {
    id: 'crooked-man-demon',
    name: 'The Crooked Man',
    origin: 'A demonic manifestation of a malicious parasite utilizing children\'s rhymes and simple toys as vectors.',
    history: 'Manifested through Janet Hodgson\'s nursery rhyme machine to isolate her from her family. Appears as a tall black-suited figure walking with a rhythmic disjointed limp, holding a crimson gothic umbrella.',
    abilities: ['Voice projection', 'Extreme size morphing', 'Rhythmic spatial loops'],
    victims: ['Janet Hodgson', 'Billy Hodgson'],
    moviesAppearedIn: ['The Conjuring 2'],
    threatLevel: 'HIGH',
    imageUrl: crookedManImage
  },
  {
    id: 'ferryman',
    name: 'The Ferryman',
    origin: 'An ancient psychopomp spirit who transports souls but demands dual silver coins placed over the eyes of deceased bodies.',
    history: 'The Warrens locked this archaic dark practitioner\'s armor and chest inside their vault, but when uncontained, they manifest as a tall hooded skeletal entity carrying a rusted lanterns beam that freezes targets in pitch darkness.',
    abilities: ['Soul encapsulation', 'Light absorption', 'Corruptive mist generation'],
    victims: ['Stray hospital patients', 'Daniel Higgins (descendants)'],
    moviesAppearedIn: ['Annabelle Comes Home'],
    threatLevel: 'MEDIUM',
    imageUrl: ferrymanImage
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: 1952,
    title: 'Cârța Abbey Catastrophe',
    movie: 'The Nun',
    description: 'Vatican investigators travel into deep Romanian woodlands to battle Valak inside a crumbling fortress.',
    glowingConnections: ['1967', '1971'],
    poster: theNunPoster,
    details: 'Valak breaks active monastic boundaries by latching onto Maurice (Frenchie), securing an entry portal into Western society.'
  },
  {
    year: 1967,
    title: 'The Mullins Inception',
    movie: 'Annabelle: Creation',
    description: 'An orphan girl discovers Samuel Mullins\' locked closet and accidentally offers her soul to a demonic presence looking to occupy a porcelain doll.',
    glowingConnections: ['1952', '1971'],
    poster: annabelleCreationPoster,
    details: 'Janice becomes possessed by the Ram spirit and is subsequently adopted by the Higgins family under the name "Annabelle".'
  },
  {
    year: 1970,
    title: 'The Cult Slaughter & The Girls\' Doll Curse',
    movie: 'Annabelle',
    description: 'A young pregnant mother is assaulted by cultists, leading to the doll absorbing active ritual blood grids.',
    glowingConnections: ['1967', '1971'],
    poster: annabellePoster,
    details: 'The doll passes to nursing students who seek Ed and Lorraine Warren\'s aid. The doll is finally locked in their secure glass cabinet.'
  },
  {
    year: 1971,
    title: 'The Harrisville Farmhouse Haunting',
    movie: 'The Conjuring',
    description: 'The Perron family moves into a Rhode Island farmhouse cursed by Bathsheba Sherman, sparking extreme physical attacks.',
    glowingConnections: ['1952', '1970', '1977'],
    poster: conjuringPoster,
    details: 'Ed Warren successfully conducts his first full-scale exorcism under extreme pressure, saving Carolyn Perron from murdering her children.'
  },
  {
    year: 1977,
    title: 'The Enfield Poltergeist Screams',
    movie: 'The Conjuring 2',
    description: 'An English council home is completely upended by poltergeist swings. Janet Hodgson is possessed by an old man named Bill Wilkins.',
    glowingConnections: ['1971', '1981'],
    poster: conjuring2Poster,
    details: 'Lorraine Warren realizes Valak is shielding Wilkins from discovery. She defeats Valak using its formal, classified name.'
  },
  {
    year: 1981,
    title: 'Trial of Arne Cheyenne Johnson',
    movie: 'The Devil Made Me Do It',
    description: 'For the first time in an American court, a murder suspect claims official demonic possession as a legal shield.',
    glowingConnections: ['1977'],
    poster: devilPoster,
    details: 'The Warrens discover Arne Johnson drew a curse from David Glatzel’s exorcism via an Occultist\'s dynamic witch altar totems.'
  }
];

export const galleryItems: GalleryItem[] = [
 {
  id: '1',
  title: 'THE NUN',
  imageUrl: theNunPoster,
  type: 'poster'
},
{
  id: '2',
  title: 'ANNABELLE CREATION',
  imageUrl: annabelleCreationPoster,
  type: 'poster'
},
{
  id: '3',
  title: 'ANNABELLE',
  imageUrl: annabellePoster,
  type: 'poster'
},
{
  id: '4',
  title: 'THE CONJURING',
  imageUrl: conjuringPoster,
  type: 'poster'
},
{
  id: '5',
  title: 'THE CONJURING 2',
  imageUrl: conjuring2Poster,
  type: 'poster'
},
{
  id: '6',
  title: 'THE DEVIL MADE ME DO IT',
  imageUrl: devilPoster,
  type: 'poster'
},
{
  id: '7',
  title: 'VALAK',
  imageUrl: valakImage,
  type: 'concept'
},
{
  id: '8',
  title: 'ANNABELLE DOLL',
  imageUrl: annabelleArtifact,
  type: 'production'
}
];
