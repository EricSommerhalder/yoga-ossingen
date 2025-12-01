import { Config, Field } from 'alinea'
import { createCMS } from 'alinea/next'

// Create types for your CMS schema
const Page = Config.type('Page', {
  fields: {
    title: Field.text('Title'),
    path: Field.path('Path')
  }
})

export const HomePage = Config.type('HomePage', {
  fields: {
    title: Field.text('Title'),
    subtitle: Field.text('Subtitle'),
    textContent: Field.richText('Text'),
    headerImage: Field.image('Header Image'),
    headerImageAlt: Field.text('Header Image Alt'),
    actionButton: Field.text('Action Button'),
    profileImage: Field.image('Profil Image'),
    profileImageAlt: Field.text('Profil Image Alt'),

  }
})

export const AngebotPage = Config.type('AngebotPage', {
  fields: {
    title: Field.text('Title'),
    introTitle: Field.text('Intro Title'),
    introText: Field.richText('Intro Text'),
    offerTitle: Field.text('Offer Title'),
    offerText: Field.richText('Offer Text'),
    scheduleTitle: Field.text('Schedule Title'),
    scheduleText: Field.richText('Schedule Text'),
    image1: Field.image('Image 1'),
    image1Alt: Field.text('Image 1 Alt'),
    image2: Field.image('Image 2'),
    image2Alt: Field.text('Image 2 Alt'),
    ctaButton: Field.text('CTA Button Text'),
    ctaButtonLink: Field.text('CTA Button Link'),
  }
})

export const AboutPage = Config.type('AboutPage', {
  fields: {
    title: Field.text('Title'),
    introText: Field.richText('Intro Text'),
    image1: Field.image('Image 1'),
    image1Alt: Field.text('Image 1 Alt'),
    philosophyText: Field.richText('Philosophy Text'),
    image2: Field.image('Image 2'),
    image2Alt: Field.text('Image 2 Alt'),
    educationText: Field.richText('Education Text'),
  }
})

export const NavigationItem = Config.type('NavigationItem', {
  fields: {
    label: Field.text('Label'),
    link: Field.text('Link')
  }
})

export const Navigation = Config.type('Navigation', {
  fields: {
    title: Field.text('Title'),
    path: Field.path('Path'),
    items: Field.list('Items', {
      schema: {
        NavigationItem
      }
    })
  }
})

export const cms = createCMS({
  // List out available types in your schema
  schema: {
    Page,
    HomePage,
    AngebotPage,
    AboutPage,
    Navigation,
    NavigationItem
  },

  // Define the content structure of your CMS
  workspaces: {
    main: Config.workspace('Yoga Ossingen', {
      color: '#64c4ed',
      source: 'content',
      mediaDir: 'public',
      roots: {
        pages: Config.root('Pages', {
          preview: true,
          children: {
            index: Config.page({
              type: HomePage,
              fields: { title: 'Home' }
            }),
            'angebot': Config.page({
              type: AngebotPage,
              fields: { title: 'Angebot' }
            }),
            'ueber-mich': Config.page({
              type: AboutPage,
              fields: { title: 'Über mich' }
            }),
            /*'kontakt': Config.page({
                type: Page,
                fields: {title: 'Kontakt'}
            })*/

          }
        }),
        navigation: Config.root('Navigation', {
          contains: ['Navigation'],
          children: {

            main: Config.page({
              type: Navigation,
              fields: { title: 'Main Navigation' }
            }
            ),
          }
        }),
        media: Config.media()
      }
    })
  },

  baseUrl: {
    // Point to your local website
    development: 'http://localhost:3000',
    // The production URL of your website
    production: 'https://yoga-ossingen.ch'
  },

  // Enable live previews after adding <cms.previews widget /> to your layout
  preview: true,

  // The handler route URL
  handlerUrl: '/api/cms',

  // The admin dashboard will be bundled in this static file
  dashboardFile: 'admin.html'
})
