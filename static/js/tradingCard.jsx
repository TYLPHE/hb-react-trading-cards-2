function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} alt="profile" />
      <p>Skill: {props.skill} </p>
    </div>
  );
}

function AddTradingCard({ addCard }) {
  const [name, setName] = React.useState('');
  const [skill, setSkill] = React.useState('');

  const data = {name, skill};

  function addNewCard() {
    fetch('/add-card', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((newCard) => addCard(newCard));
  }

  return (
    <React.Fragment>
      <h2>Add New Trading Card</h2>
      <label htmlFor="nameInput">Name</label>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        id='nameInput'
        style={{ marginleft:'5px' }}
      />
      <label 
        htmlFor="skillInput" 
        style={{ marginLeft:'10px', marginRight:'5px'}}
      >
        Skill
      </label>
      <input 
        value={skill} 
        onChange={(e) => setSkill(e.target.value)}
        id='skillInput'
      />
      <button onClick={addNewCard} style={{marginLeft:'10px'}}>Add</button>
    </React.Fragment>
  );
}

function TradingCardContainer() {
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    fetch('/cards.json')
      .then((res) => res.json())
      .then((cardArr) => {
        setCards(cardArr.cards)
    });
  }, [])

  const tradingCards = [];

  for (const currentCard of cards) {
    tradingCards.push(
      <TradingCard
        key={currentCard.cardId}
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />,
    );
  }

  function addCard(newCard) {
    setCards([...cards, newCard]);
  }

  return (
    <React.Fragment>
      <AddTradingCard addCard={addCard}/>
      <div className="grid">{tradingCards}</div>
    </React.Fragment>
  );
}

ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));
