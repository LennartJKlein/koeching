import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  MediaAttribute,
  RichTextAttribute,
  TextAttribute,
  UIDAttribute,
  ComponentAttribute,
  ComponentSchema,
} from '@strapi/strapi'

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Rechten'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    properties: JSONAttribute & DefaultTo<{}>
    conditions: JSONAttribute & DefaultTo<[]>
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'admin::permission', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'admin::permission', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'Gebruiker'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    username: StringAttribute
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: StringAttribute & PrivateAttribute
    registrationToken: StringAttribute & PrivateAttribute
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>
    preferedLanguage: StringAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Rol'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    description: StringAttribute
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>
    permissions: RelationAttribute<'admin::role', 'oneToMany', 'admin::permission'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token'
    singularName: 'api-token'
    pluralName: 'api-tokens'
    displayName: 'Api Token'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }> &
      DefaultTo<''>
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: DateTimeAttribute
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >
    expiresAt: DateTimeAttribute
    lifespan: BigIntegerAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'admin::api-token', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'admin::api-token', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission'
    description: ''
    singularName: 'api-token-permission'
    pluralName: 'api-token-permissions'
    displayName: 'API Token Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file'
    pluralName: 'files'
    displayName: 'Bestand'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    alternativeText: StringAttribute
    caption: StringAttribute
    width: IntegerAttribute
    height: IntegerAttribute
    formats: JSONAttribute
    hash: StringAttribute & RequiredAttribute
    ext: StringAttribute
    mime: StringAttribute & RequiredAttribute
    size: DecimalAttribute & RequiredAttribute
    url: StringAttribute & RequiredAttribute
    previewUrl: StringAttribute
    provider: StringAttribute & RequiredAttribute
    provider_metadata: JSONAttribute
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1
      }>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'plugin::upload.file', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'plugin::upload.file', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder'
    pluralName: 'folders'
    displayName: 'Map'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1
      }>
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >
    files: RelationAttribute<'plugin::upload.folder', 'oneToMany', 'plugin::upload.file'>
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1
      }>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'plugin::upload.folder', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'plugin::upload.folder', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale'
    pluralName: 'locales'
    collectionName: 'locales'
    displayName: 'Talen'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1
        max: 50
      }>
    code: StringAttribute & UniqueAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'plugin::i18n.locale', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'plugin::i18n.locale', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Rechten'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: StringAttribute & RequiredAttribute
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Rol'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3
      }>
    description: StringAttribute
    type: StringAttribute & UniqueAttribute
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'Gebruiker'
  }
  options: {
    draftAndPublish: false
    timestamps: true
  }
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3
      }>
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    provider: StringAttribute
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: StringAttribute & PrivateAttribute
    confirmationToken: StringAttribute & PrivateAttribute
    confirmed: BooleanAttribute & DefaultTo<false>
    blocked: BooleanAttribute & DefaultTo<false>
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiActivityActivity extends CollectionTypeSchema {
  updatedAt: DateTimeAttribute
  id: Number
  name: StringAttribute & RequiredAttribute
  moments: ComponentAttribute<'details.moment', true>
  coaches: RelationAttribute<'api::activity.activity', 'manyToMany', 'api::coach.coach'>
  interventions: RelationAttribute<
    'api::activity.activity',
    'manyToMany',
    'api::intervention.intervention'
  >
  photos: MediaAttribute
  location: StringAttribute
  slug: UIDAttribute<'api::activity.activity', 'name'>
  seo_description: TextAttribute
  seo_title: StringAttribute
  intro: TextAttribute
  thumbnail: MediaAttribute
  seo_keywords: ComponentAttribute<'details.keywords', true> &
    SetMinMax<{
      max: 5
    }>
  rank: IntegerAttribute
  pricings: RelationAttribute<
    'api::activity.activity',
    'manyToMany',
    'api::pricing.pricing'
  >
  content: RichTextAttribute
  info: {
    singularName: 'activity'
    pluralName: 'activities'
    displayName: 'Activiteit'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    id: Number
    name: StringAttribute & RequiredAttribute
    moments: ComponentAttribute<'details.moment', true>
    coaches: RelationAttribute<'api::activity.activity', 'manyToMany', 'api::coach.coach'>
    interventions: RelationAttribute<
      'api::activity.activity',
      'manyToMany',
      'api::intervention.intervention'
    >
    photos: MediaAttribute
    location: StringAttribute
    slug: UIDAttribute<'api::activity.activity', 'name'>
    seo_description: TextAttribute
    seo_title: StringAttribute
    intro: TextAttribute
    thumbnail: MediaAttribute
    seo_keywords: ComponentAttribute<'details.keywords', true> &
      SetMinMax<{
        max: 5
      }>
    rank: IntegerAttribute
    pricings: RelationAttribute<
      'api::activity.activity',
      'manyToMany',
      'api::pricing.pricing'
    >
    content: RichTextAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::activity.activity', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::activity.activity', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiAnimalAnimal extends CollectionTypeSchema {
  updatedAt: DateTimeAttribute
  id: Number
  bio: RichTextAttribute
  name: StringAttribute
  photos: MediaAttribute
  rank: IntegerAttribute
  slug: UIDAttribute<'api::animal.animal', 'name'> & RequiredAttribute
  info: {
    singularName: 'animal'
    pluralName: 'animals'
    displayName: 'Dier'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    bio: RichTextAttribute
    name: StringAttribute
    photos: MediaAttribute
    rank: IntegerAttribute
    slug: UIDAttribute<'api::animal.animal', 'name'> & RequiredAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::animal.animal', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::animal.animal', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiCoachCoach extends CollectionTypeSchema {
  updatedAt: DateTimeAttribute
  id: Number
  external: BooleanAttribute & DefaultTo<false>
  bio: RichTextAttribute
  intro: TextAttribute
  name: StringAttribute & RequiredAttribute
  photos: MediaAttribute & RequiredAttribute
  slug: UIDAttribute<'api::coach.coach', 'name'> & RequiredAttribute
  programs: RelationAttribute<'api::coach.coach', 'manyToMany', 'api::program.program'>
  seminars: RelationAttribute<'api::coach.coach', 'manyToMany', 'api::seminar.seminar'>
  trainings: RelationAttribute<'api::coach.coach', 'manyToMany', 'api::training.training'>
  interventions: RelationAttribute<
    'api::coach.coach',
    'manyToMany',
    'api::intervention.intervention'
  >
  activities: RelationAttribute<
    'api::coach.coach',
    'manyToMany',
    'api::activity.activity'
  >
  info: {
    singularName: 'coach'
    pluralName: 'coaches'
    displayName: 'Coach'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    photos: MediaAttribute & RequiredAttribute
    bio: RichTextAttribute
    external: BooleanAttribute & DefaultTo<false>
    intro: TextAttribute
    slug: UIDAttribute<'api::coach.coach', 'name'> & RequiredAttribute
    rank: IntegerAttribute
    programs: RelationAttribute<'api::coach.coach', 'manyToMany', 'api::program.program'>
    seminars: RelationAttribute<'api::coach.coach', 'manyToMany', 'api::seminar.seminar'>
    trainings: RelationAttribute<
      'api::coach.coach',
      'manyToMany',
      'api::training.training'
    >
    interventions: RelationAttribute<
      'api::coach.coach',
      'manyToMany',
      'api::intervention.intervention'
    >
    activities: RelationAttribute<
      'api::coach.coach',
      'manyToMany',
      'api::activity.activity'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::coach.coach', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::coach.coach', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiFarmFarm extends SingleTypeSchema {
  updatedAt: DateTimeAttribute
  name: StringAttribute
  content: RichTextAttribute
  photos: MediaAttribute
  intro: TextAttribute
  info: {
    singularName: 'farm'
    pluralName: 'farms'
    displayName: 'Boerderij'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: StringAttribute
    content: RichTextAttribute
    photos: MediaAttribute
    intro: TextAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::farm.farm', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::farm.farm', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiHomepageHomepage extends SingleTypeSchema {
  updatedAt: DateTimeAttribute
  photos: MediaAttribute & RequiredAttribute
  sales_text: ComponentAttribute<'content.paragraph', true> &
    SetMinMax<{
      min: 1
      max: 3
    }>
  title: StringAttribute & RequiredAttribute
  videos: ComponentAttribute<'content.youtube-video', true>
  info: {
    singularName: 'homepage'
    pluralName: 'homepages'
    displayName: 'Homepage'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    photos: MediaAttribute & RequiredAttribute
    sales_text: ComponentAttribute<'content.paragraph', true> &
      SetMinMax<{
        min: 1
        max: 3
      }>
    title: StringAttribute & RequiredAttribute
    videos: ComponentAttribute<'content.youtube-video', true>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::homepage.homepage', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::homepage.homepage', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiInterventionIntervention extends CollectionTypeSchema {
  updatedAt: DateTimeAttribute
  id: Number
  name: StringAttribute & RequiredAttribute
  content: RichTextAttribute
  photos: MediaAttribute
  intro: TextAttribute
  seo_title: StringAttribute
  seo_description: TextAttribute
  pricings: ComponentAttribute<'details.price', true>
  location: StringAttribute
  thumbnail: MediaAttribute & RequiredAttribute
  slug: UIDAttribute<'api::intervention.intervention', 'name'> & RequiredAttribute
  seo_keywords: ComponentAttribute<'details.keywords', true> &
    SetMinMax<{
      max: 5
    }>
  programs: RelationAttribute<
    'api::intervention.intervention',
    'manyToMany',
    'api::program.program'
  >
  seminars: RelationAttribute<
    'api::intervention.intervention',
    'manyToMany',
    'api::seminar.seminar'
  >
  trainings: RelationAttribute<
    'api::intervention.intervention',
    'manyToMany',
    'api::training.training'
  >
  activities: RelationAttribute<
    'api::intervention.intervention',
    'manyToMany',
    'api::activity.activity'
  >
  coaches: RelationAttribute<
    'api::intervention.intervention',
    'manyToMany',
    'api::coach.coach'
  >
  info: {
    singularName: 'intervention'
    pluralName: 'interventions'
    displayName: 'Interventie'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    slug: UIDAttribute<'api::intervention.intervention', 'name'> & RequiredAttribute
    content: RichTextAttribute
    intro: TextAttribute
    photos: MediaAttribute
    seo_title: StringAttribute
    seo_description: TextAttribute
    pricings: ComponentAttribute<'details.price', true>
    location: StringAttribute
    thumbnail: MediaAttribute & RequiredAttribute
    seo_keywords: ComponentAttribute<'details.keywords', true> &
      SetMinMax<{
        max: 5
      }>
    programs: RelationAttribute<
      'api::intervention.intervention',
      'manyToMany',
      'api::program.program'
    >
    seminars: RelationAttribute<
      'api::intervention.intervention',
      'manyToMany',
      'api::seminar.seminar'
    >
    trainings: RelationAttribute<
      'api::intervention.intervention',
      'manyToMany',
      'api::training.training'
    >
    activities: RelationAttribute<
      'api::intervention.intervention',
      'manyToMany',
      'api::activity.activity'
    >
    coaches: RelationAttribute<
      'api::intervention.intervention',
      'manyToMany',
      'api::coach.coach'
    >
    rank: IntegerAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::intervention.intervention',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::intervention.intervention',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiLegalLegal extends SingleTypeSchema {
  updatedAt: DateTimeAttribute
  privacy_data: RichTextAttribute
  terms: RichTextAttribute
  privacy_web: RichTextAttribute
  info: {
    singularName: 'legal'
    pluralName: 'legals'
    displayName: 'Juridisch'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    privacy_data: RichTextAttribute
    terms: RichTextAttribute
    privacy_web: RichTextAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::legal.legal', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::legal.legal', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiMembershipMembership extends CollectionTypeSchema {
  updatedAt: DateTimeAttribute
  name: StringAttribute
  membership_id: StringAttribute
  url: StringAttribute
  logo: MediaAttribute
  slug: UIDAttribute<'api::membership.membership', 'name'>
  rank: IntegerAttribute
  createdAt: DateTimeAttribute
  publishedAt: DateTimeAttribute
  id: Number
  info: {
    singularName: 'membership'
    pluralName: 'memberships'
    displayName: 'Lidmaatschap'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: StringAttribute
    membership_id: StringAttribute
    url: StringAttribute
    logo: MediaAttribute
    slug: UIDAttribute<'api::membership.membership', 'name'>
    rank: IntegerAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::membership.membership',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::membership.membership',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiMessageMessage extends CollectionTypeSchema {
  updatedAt: DateTimeAttribute
  title: StringAttribute
  media: MediaAttribute
  content: RichTextAttribute
  author: RelationAttribute<'api::message.message', 'oneToOne', 'admin::user'>
  seo_title: StringAttribute
  seo_description: TextAttribute
  seo_keywords: StringAttribute
  seo_keywords: ComponentAttribute<'details.keywords', true> &
    SetMinMax<{
      max: 5
    }>
  slug: UIDAttribute<'api::message.message', 'title'>
  createdAt: DateTimeAttribute
  publishedAt: DateTimeAttribute
  info: {
    singularName: 'message'
    pluralName: 'messages'
    displayName: 'Bericht'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: StringAttribute
    media: MediaAttribute
    content: RichTextAttribute
    author: RelationAttribute<'api::message.message', 'oneToOne', 'admin::user'>
    seo_title: StringAttribute
    seo_description: TextAttribute
    seo_keywords: StringAttribute
    seo_keywords: ComponentAttribute<'details.keywords', true> &
      SetMinMax<{
        max: 5
      }>
    slug: UIDAttribute<'api::message.message', 'title'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::message.message', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::message.message', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiParticipantParticipant extends CollectionTypeSchema {
  updatedAt: DateTimeAttribute
  id: Number
  seminar: RelationAttribute<
    'api::participant.participant',
    'oneToOne',
    'api::seminar.seminar'
  >
  training: RelationAttribute<
    'api::participant.participant',
    'oneToOne',
    'api::training.training'
  >
  activity: RelationAttribute<
    'api::participant.participant',
    'oneToOne',
    'api::activity.activity'
  >
  moment: ComponentAttribute<'details.moment'>
  payment: BooleanAttribute
  comments: TextAttribute
  contact: ComponentAttribute<'details.contact'>
  participants: ComponentAttribute<'details.participants', true>
  info: {
    singularName: 'participant'
    pluralName: 'participants'
    displayName: 'Aanmelding'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    seminar: RelationAttribute<
      'api::participant.participant',
      'oneToOne',
      'api::seminar.seminar'
    >
    training: RelationAttribute<
      'api::participant.participant',
      'oneToOne',
      'api::training.training'
    >
    activity: RelationAttribute<
      'api::participant.participant',
      'oneToOne',
      'api::activity.activity'
    >
    moment: ComponentAttribute<'details.moment'>
    payment: BooleanAttribute
    comments: TextAttribute
    contact: ComponentAttribute<'details.contact'>
    participants: ComponentAttribute<'details.participants', true>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::participant.participant',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::participant.participant',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiPricingPricing extends CollectionTypeSchema {
  updatedAt: DateTimeAttribute
  id: Number
  description: StringAttribute &
    RequiredAttribute &
    UniqueAttribute &
    DefaultTo<'--- euro per sessie van --- uur'>
  programs: RelationAttribute<
    'api::pricing.pricing',
    'manyToMany',
    'api::program.program'
  >
  trainings: RelationAttribute<
    'api::pricing.pricing',
    'manyToMany',
    'api::training.training'
  >
  activities: RelationAttribute<
    'api::intervention.intervention',
    'manyToMany',
    'api::activity.activity'
  >
  seminars: RelationAttribute<
    'api::pricing.pricing',
    'manyToMany',
    'api::seminar.seminar'
  >
  interventions: RelationAttribute<
    'api::pricing.pricing',
    'manyToMany',
    'api::intervention.intervention'
  >
  info: {
    singularName: 'pricing'
    pluralName: 'pricings'
    displayName: 'Tarief'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    description: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      DefaultTo<'--- euro per sessie van --- uur'>
    programs: RelationAttribute<
      'api::pricing.pricing',
      'manyToMany',
      'api::program.program'
    >
    trainings: RelationAttribute<
      'api::pricing.pricing',
      'manyToMany',
      'api::training.training'
    >
    activities: RelationAttribute<
      'api::intervention.intervention',
      'manyToMany',
      'api::activity.activity'
    >
    seminars: RelationAttribute<
      'api::pricing.pricing',
      'manyToMany',
      'api::seminar.seminar'
    >
    interventions: RelationAttribute<
      'api::pricing.pricing',
      'manyToMany',
      'api::intervention.intervention'
    >
    rank: IntegerAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::pricing.pricing', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::pricing.pricing', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiReimbursementReimbursement extends SingleTypeSchema {
  updatedAt: DateTimeAttribute
  files: MediaAttribute
  content: RichTextAttribute
  info: {
    singularName: 'reimbursement'
    pluralName: 'reimbursements'
    displayName: 'Vergoedingen'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    files: MediaAttribute
    content: RichTextAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::reimbursement.reimbursement',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::reimbursement.reimbursement',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiSeminarSeminar extends CollectionTypeSchema {
  updatedAt: DateTimeAttribute
  name: StringAttribute & RequiredAttribute
  moments: ComponentAttribute<'details.moment', true>
  coaches: RelationAttribute<'api::seminar.seminar', 'manyToMany', 'api::coach.coach'>
  interventions: RelationAttribute<
    'api::seminar.seminar',
    'manyToMany',
    'api::intervention.intervention'
  >
  intro: TextAttribute
  location: StringAttribute
  content: RichTextAttribute
  seo_description: TextAttribute
  id: Number
  seo_title: StringAttribute
  slug: UIDAttribute<'api::seminar.seminar', 'name'> & RequiredAttribute
  thumbnail: MediaAttribute & RequiredAttribute
  photos: MediaAttribute
  pricings: ComponentAttribute<'details.price', true>
  seo_keywords: ComponentAttribute<'details.keywords', true> &
    SetMinMax<{
      max: 5
    }>
  info: {
    singularName: 'seminar'
    pluralName: 'seminars'
    displayName: 'Informatieavond'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    moments: ComponentAttribute<'details.moment', true>
    coaches: RelationAttribute<'api::seminar.seminar', 'manyToMany', 'api::coach.coach'>
    interventions: RelationAttribute<
      'api::seminar.seminar',
      'manyToMany',
      'api::intervention.intervention'
    >
    intro: TextAttribute
    location: StringAttribute
    seo_description: TextAttribute
    seo_title: StringAttribute
    content: RichTextAttribute
    slug: UIDAttribute<'api::seminar.seminar', 'name'> & RequiredAttribute
    thumbnail: MediaAttribute & RequiredAttribute
    photos: MediaAttribute
    pricings: ComponentAttribute<'details.price', true>
    seo_keywords: ComponentAttribute<'details.keywords', true> &
      SetMinMax<{
        max: 5
      }>
    rank: IntegerAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::seminar.seminar', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::seminar.seminar', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiProgramProgram extends CollectionTypeSchema {
  updatedAt: DateTimeAttribute
  name: StringAttribute & RequiredAttribute
  coaches: RelationAttribute<'api::program.program', 'manyToMany', 'api::coach.coach'>
  interventions: RelationAttribute<
    'api::program.program',
    'manyToMany',
    'api::intervention.intervention'
  >
  content: RichTextAttribute
  photos: MediaAttribute
  seo_title: StringAttribute
  seo_description: TextAttribute
  intro: TextAttribute
  id: Number
  pricings: ComponentAttribute<'details.price', true>
  location: StringAttribute
  thumbnail: MediaAttribute & RequiredAttribute
  slug: UIDAttribute<'api::program.program', 'name'> & RequiredAttribute
  seo_keywords: ComponentAttribute<'details.keywords', true> &
    SetMinMax<{
      max: 5
    }>
  info: {
    singularName: 'program'
    pluralName: 'programs'
    displayName: 'Traject'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    coaches: RelationAttribute<'api::program.program', 'manyToMany', 'api::coach.coach'>
    interventions: RelationAttribute<
      'api::program.program',
      'manyToMany',
      'api::intervention.intervention'
    >
    content: RichTextAttribute
    photos: MediaAttribute
    seo_title: StringAttribute
    seo_description: TextAttribute
    intro: TextAttribute
    pricings: ComponentAttribute<'details.price', true>
    location: StringAttribute
    thumbnail: MediaAttribute & RequiredAttribute
    slug: UIDAttribute<'api::program.program', 'name'> & RequiredAttribute
    seo_keywords: ComponentAttribute<'details.keywords', true> &
      SetMinMax<{
        max: 5
      }>
    rank: IntegerAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::program.program', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::program.program', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiTrainingTraining extends CollectionTypeSchema {
  updatedAt: DateTimeAttribute
  name: StringAttribute & RequiredAttribute
  moments: ComponentAttribute<'details.moment', true>
  coaches: RelationAttribute<'api::training.training', 'manyToMany', 'api::coach.coach'>
  interventions: RelationAttribute<
    'api::training.training',
    'manyToMany',
    'api::intervention.intervention'
  >
  id: Number
  photos: MediaAttribute
  content: RichTextAttribute
  pricings: ComponentAttribute<'details.price', true>
  location: StringAttribute
  slug: UIDAttribute<'api::training.training', 'name'> & RequiredAttribute
  seo_description: TextAttribute
  seo_title: StringAttribute
  intro: TextAttribute
  thumbnail: MediaAttribute & RequiredAttribute
  seo_keywords: ComponentAttribute<'details.keywords', true> &
    SetMinMax<{
      max: 5
    }>
  info: {
    singularName: 'training'
    pluralName: 'trainings'
    displayName: 'Training'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    moments: ComponentAttribute<'details.moment', true>
    coaches: RelationAttribute<'api::training.training', 'manyToMany', 'api::coach.coach'>
    interventions: RelationAttribute<
      'api::training.training',
      'manyToMany',
      'api::intervention.intervention'
    >
    photos: MediaAttribute
    pricings: ComponentAttribute<'details.price', true>
    content: RichTextAttribute
    location: StringAttribute
    slug: UIDAttribute<'api::training.training', 'name'> & RequiredAttribute
    seo_description: TextAttribute
    seo_title: StringAttribute
    intro: TextAttribute
    thumbnail: MediaAttribute & RequiredAttribute
    seo_keywords: ComponentAttribute<'details.keywords', true> &
      SetMinMax<{
        max: 5
      }>
    rank: IntegerAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::training.training', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::training.training', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ContentParagraph extends ComponentSchema {
  body: TextAttribute & RequiredAttribute
  info: {
    displayName: 'Alinea'
    description: ''
  }
  attributes: {
    body: TextAttribute & RequiredAttribute
  }
}

export interface ContentYoutubeVideo extends ComponentSchema {
  info: {
    displayName: 'Youtube video'
    description: ''
  }
  attributes: {
    url: StringAttribute
  }
}

export interface DetailsAddress extends ComponentSchema {
  street: StringAttribute
  streetNr: StringAttribute
  postalCode: StringAttribute
  city: StringAttribute
  info: {
    displayName: 'address'
  }
  attributes: {
    street: StringAttribute
    streetNr: StringAttribute
    postalCode: StringAttribute
    city: StringAttribute
  }
}

export interface DetailsContact extends ComponentSchema {
  name: StringAttribute
  phone: StringAttribute
  address: ComponentAttribute<'details.address'>
  email: EmailAttribute
  info: {
    displayName: 'contact'
  }
  attributes: {
    name: StringAttribute
    phone: StringAttribute
    address: ComponentAttribute<'details.address'>
    email: EmailAttribute
  }
}

export interface DetailsKeywords extends ComponentSchema {
  keyword: StringAttribute
  info: {
    displayName: 'Sleutelwoorden'
    icon: 'tags'
    description: ''
  }
  attributes: {
    keyword: StringAttribute
  }
}

export interface DetailsMoment extends ComponentSchema {
  start_date: DateTimeAttribute
  end_date: DateTimeAttribute
  title: StringAttribute
  description: RichTextAttribute
  open: BooleanAttribute & DefaultTo<true>
  id: Number
  info: {
    displayName: 'Groep'
    icon: 'chart-bubble'
    description: ''
  }
  attributes: {
    start_date: DateTimeAttribute
    end_date: DateTimeAttribute
    title: StringAttribute
    description: RichTextAttribute
    open: BooleanAttribute & DefaultTo<true>
  }
}

export interface DetailsParticipants extends ComponentSchema {
  name: StringAttribute
  age: IntegerAttribute
  info: {
    displayName: 'participants'
  }
  attributes: {
    name: StringAttribute
    age: IntegerAttribute
  }
}

export interface DetailsPrice extends ComponentSchema {
  price: StringAttribute & RequiredAttribute
  info: {
    displayName: 'Tarief'
    icon: 'dollar-sign'
    description: ''
  }
  attributes: {
    price: StringAttribute & RequiredAttribute
  }
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::api-token-permission': AdminApiTokenPermission
      'admin::api-token': AdminApiToken
      'admin::permission': AdminPermission
      'admin::role': AdminRole
      'admin::user': AdminUser
      'api::activity.activity': ApiActivityActivity
      'api::animal.animal': ApiAnimalAnimal
      'api::coach.coach': ApiCoachCoach
      'api::farm.farm': ApiFarmFarm
      'api::homepage.homepage': ApiHomepageHomepage
      'api::intervention.intervention': ApiInterventionIntervention
      'api::legal.legal': ApiLegalLegal
      'api::membership.membership': ApiMembershipMembership
      'api::message.message': ApiMessageMessage
      'api::participant.participant': ApiParticipantParticipant
      'api::pricing.pricing': ApiPricingPricing
      'api::program.program': ApiProgramProgram
      'api::reimbursement.reimbursement': ApiReimbursementReimbursement
      'api::seminar.seminar': ApiSeminarSeminar
      'api::training.training': ApiTrainingTraining
      'content.paragraph': ContentParagraph
      'content.youtube-video': ContentYoutubeVideo
      'details.address': DetailsAddress
      'details.contact': DetailsContact
      'details.keywords': DetailsKeywords
      'details.moment': DetailsMoment
      'details.participants': DetailsParticipants
      'details.price': DetailsPrice
      'plugin::i18n.locale': PluginI18NLocale
      'plugin::upload.file': PluginUploadFile
      'plugin::upload.folder': PluginUploadFolder
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission
      'plugin::users-permissions.role': PluginUsersPermissionsRole
      'plugin::users-permissions.user': PluginUsersPermissionsUser
    }
  }
}
