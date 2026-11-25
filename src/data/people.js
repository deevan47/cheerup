// "Who's on your mind?" on the Home page. Each idea = [category name, one line].
//
// The category name must match a `name` in data/products.js exactly ('Mugs',
// 'Photo frames', 'Fridge magnets', ...), because the idea links to that card on
// the Gifts page and borrows its photo once there is one.
//
// The lines are written about the person, not the product: what the gift says,
// not what it is made of. No he, she, him or her; "they" and "them" throughout.
// An empty ideas list shows the "tell me three things about them" panel instead.
export const PEOPLE = [
  { k: 'Mum', ideas: [
    ['Mugs', 'They’ve poured chai for everyone. Now pour them one with their name on it.'],
    ['Calendars', 'Twelve months of the family, on the wall by the kitchen.'],
    ['Pillows', 'Your baby photo, on something soft. Keep tissues ready. For both of you.'],
  ] },
  { k: 'Dad', ideas: [
    ['Mugs', 'They’ll never say it. They’ll just drink from it every morning.'],
    ['Keychains', 'Car keys. House keys. And you.'],
    ['Photo frames', 'The photo they’re secretly proudest of, where they can see it every day.'],
  ] },
  { k: 'Partner', ideas: [
    ['Magazines', 'A whole magazine about them. They are the cover story.'],
    ['Pillows', 'A heart-shaped pillow for the nights one of you is away.'],
    ['Magic mirror', 'A mirror that lights up with the two of you.'],
  ] },
  { k: 'Best friend', ideas: [
    ['Clothing', 'Their worst photo, on a T-shirt. Pure love.'],
    ['Mugs', 'The inside joke only the two of you will ever get.'],
    ['Fridge magnets', 'Your face on their fridge. Every midnight snack, a reminder.'],
  ] },
  { k: 'Sibling', ideas: [
    ['Phone cases', 'A childhood photo. Maximum embarrassment. Maximum love.'],
    ['Clothing', 'Matching hoodies. Because nobody gets you like they do.'],
    ['Polaroids', 'Every family trip, in one small stack they can keep.'],
  ] },
  { k: 'Colleague', ideas: [
    ['Mugs', 'Their own mug on the desk. Proof someone noticed.'],
    ['Calendars', 'A desk calendar of the whole team, for the year they’re gone.'],
    ['Keychains', 'A goodbye they’ll carry into the next chapter.'],
  ] },
  { k: 'Teacher', ideas: [
    ['Photo frames', 'A whole class in one frame, and a thank-you they’ll keep.'],
    ['Glass frames', 'The class photo on glass, for the desk they taught from.'],
    ['Mugs', 'For the teacher who believed in you. Warm chai, warmer thanks.'],
  ] },
  { k: 'Not sure yet', ideas: [] },
];
