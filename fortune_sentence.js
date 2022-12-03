export function fortune_sentence(){
    //sentence_base stores all the fortune sentences
    const sentence_base = [
        'From now on your kindness will lead you to success.',
        'For hate is never conquered by hate. Hate is conquered by love.',
        'Every flower blooms in its own sweet time.',
        'Good news will be brought to you by mail.',
        'An alien of some sort will be appearing to you shortly.',
        'You always bring others happiness.',
        'Someone will invite you to a Karaoke party.',
        'Congratulations! You are on your way.',
        'All your hard work will soon pay off.',
        'A lifetime of happiness lies ahead of you.',
        'A pleasant surprise is waiting for you.',
        'You desire recognition and you will find it.',
        'You make people realize that there exist other beauties in the world.',
        'You will be blessed with longevity.',
        'You will be sharing great news with all the people you love.',
        'Your love of music will be an important part of your life.'
    ]

    // randomly pick one sentence from the sentence_base and return it
    random_number = Math.floor(Math.random() * (16));

    return sentence_base[random_number]
}