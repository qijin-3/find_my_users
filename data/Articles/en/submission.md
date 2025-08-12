# Submission Guidelines

This project currently only accepts **free promotional channels** for products.

Independent development is challenging, so let's save costs where we can.

You can submit channels that you've discovered or created yourself, which can help other developers promote their products for free. This includes websites, media platforms, self-media accounts, or community applications.

As an open-source project, you can contribute through either of these two methods:

## Method 1: Submit an Issue

Create a new issue with the channel information, including:
- Channel name (Chinese/English)
- Introduction: Help everyone quickly understand this channel
- Website operational status: Is this channel still active? Avoid wasting indie developers' submission time
- Channel type: The type of channel, which to some extent determines the promotion strategy
- Promotion scope: Domestic? International? Or only applicable to specific regions?
- Channel URL: The link to this channel
- Submission URL: The link for submitting products
- Submission method: How does this channel require product submissions? Form filling? Article publishing?
- Submission requirements: Are there any restrictions on product format? Or any special requirements?
- Review requirements: Does publishing products on this channel require review? How long does the review take?
- Expected exposure: How much exposure (readership) can this channel potentially bring to submitted products?
- Summary: This can be your experience sharing using this channel, or characteristics of this site, such as SEO-friendly, easy inclusion, etc.

## Method 2: Submit Code

1. Fork this project
2. Add site information in `data/json/sitelists.json`
  ```
      "name_zh": "Channel Chinese Name",
      "name_en": "Channel English Name",
      "slug": "tailwind-css",
      "date": "2025-01-28T03:34:22Z (submission time)",
      "lastModified": "2025-01-28T03:34:22Z (modification time)"
       },
  ```
3. Create a corresponding JSON file in the `data/Site/` directory, named according to the slug
4. The JSON file format requirements are:
 ```
   {
    "name_zh": "Channel Chinese Name",
    "name_en": "Channel English Name",
    "description_zh": "Channel introduction, helping everyone quickly understand this channel.",
    "description_en": "Same as above.",
    "status": "Site operational status",
    "type": "Site type",
    "region": "Applicable promotion scope",
    "url": "Site URL",
    "submitMethod": "Submission method",
    "submitUrl": "Product submission link",
    "submitRequirements_zh": "Are there any restrictions on product format? Or any special requirements?",
    "submitRequirements_en": "Same as above",
    "review": "Review required or not",
    "reviewTime": "Review duration",
    "expectedExposure": "Expected exposure (readership) this channel can bring to submitted products",
    "rating_zh": "Can be your experience sharing using this channel, or site characteristics like SEO-friendly, easy inclusion, etc.",
    "rating_en": "Same as above"
    }
```
5. In the JSON file, except for the name, description, submitRequirements, and rating fields, all other field values have been defined in [site-fields.json](https://github.com/qijin-3/find_my_users/blob/main/data/json/site-fields.json). When submitting JSON, please use the existing variable names to avoid frontend rendering failures. Of course, if you feel the current fields or corresponding variables are insufficient or not precise enough, you can also propose modifications.
6. Submit a Pull Request