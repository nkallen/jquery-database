Today I was thinking aloud about [Tree Regular Expressions](http://research.microsoft.com/Users/luca/Slides/2003-11-13%20Transitions%20in%20Programming%20Models%20\(Lisbon\).pdf) and how they might make a nice query language for document databases like CouchDB. Someone pointed out that CSS3 selectors might make a great concrete syntax for this. One thing lead to another and I thought, why not build a relational database in HTML? So I did. I even got **inner joins** working.

Let's start with a few tables:

    <table class="users">
      <tr>
        <td class="id">1</td>
        <td class="first_name">amy</td>
        <td class="last_name">bobamy</td>
      </tr> 
      ...
    </table>
    <table class="photos">
      <tr>
        <td class="id">1</td>
        <td class="user_id">1</td>
        <td class="url">http://www.example.com/foo.png</td>
      </tr> 
    </table>

Now we can express some queries:

    $('.users')
      .where('.id:eq(1)')
      .select('*')

This is equivalent to `SELECT * FROM users WHERE id = 1`

    $('.users')
      .where('.id:eq(1)')
      .select('.id, .name')

This is equivalent to `SELECT id, name FROM users WHERE id = 1`. Here is something slightly more complicated:

    $('.users')
      .where('.name:contains(a)')
        .and('.name:contains(c)')
      .select('*')

But here is **the crowning glory**, the inner join:

    $('.users')
      .join('.photos')
      .where('.photos.user_id:eq(.users.id)')
        .and('.users.id:eq(1)')
      .select('.photos.url')

This is equivalent to:

    SELECT photos.url FROM users, photos
    WHERE photos.user_id = users.id
      AND users.id = 1
      
[Download the fun](http://github.com/nkallen/jquery-database/tree/master) at Github.