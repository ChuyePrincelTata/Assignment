import React, { useEffect, useState } from 'react';
import './App.css'

function ProgrammingGame() {
  const programmingLang = [
    { name: 'Python', color: 'Blue' },
    { name: 'JavaScript', color: 'Yellow' },
    { name: 'Java', color: 'Red' },
    { name: 'C#', color: 'Green' },
    { name: 'C++', color: 'Navy' },
    { name: 'C', color: 'Gray' },
    { name: 'Go', color: 'Cyan' },
    { name: 'Ruby', color: 'Crimson' },
    { name: 'PHP', color: 'Purple' },
    { name: 'Swift', color: 'Orange' },
    { name: 'Kotlin', color: 'Violet' },
    { name: 'TypeScript', color: 'Teal' },
    { name: 'R', color: 'Azure' },
    { name: 'Dart', color: 'Aqua' },
    { name: 'Rust', color: 'Brown' },
    { name: 'SQL', color: 'Black' },
    { name: 'MATLAB', color: 'Gold' },
    { name: 'Perl', color: 'Pink' },
    { name: 'Scala', color: 'Coral' },
    { name: 'HTML/CSS', color: 'LightSalmon' },
    { name: 'Bash', color: 'Olive' },
    { name: 'Shell Script', color: 'DarkGreen' },
    { name: 'Lua', color: 'LightBlue' },
    { name: 'Haskell', color: 'Indigo' },
    { name: 'Objective-C', color: 'Silver' },
    { name: 'Assembly', color: 'Charcoal' },
    { name: 'Groovy', color: 'LightGreen' },
    { name: 'VBScript', color: 'LightPurple' },
    { name: 'Julia', color: 'Plum' },
    { name: 'Elm', color: 'DarkCyan' },
    { name: 'Apex', color: 'DarkRed' },
    { name: 'Crystal', color: 'LightCoral' },
    { name: 'CoffeeScript', color: 'Tan' },
    { name: 'ColdFusion', color: 'Maroon' },
    { name: 'Cobol', color: 'Deep Blue' },
    { name: 'Fortran', color: 'Goldenrod' },
    { name: 'ABAP', color: 'DarkYellow' },
    { name: 'Ada', color: 'LightGray' },
    { name: 'Erlang', color: 'Salmon' },
    { name: 'Prolog', color: 'SteelBlue' },
    { name: 'Pascal', color: 'Lavender' },
    { name: 'F#', color: 'SeaGreen' },
    { name: 'Lisp', color: 'LightPink' },
    { name: 'Smalltalk', color: 'Mint' },
    { name: 'D', color: 'Amber' },
    { name: 'Scheme', color: 'ForestGreen' },
    { name: 'VHDL', color: 'Beige' },
    { name: 'Verilog', color: 'Lime' },
    { name: 'Nim', color: 'HotPink' },
    { name: 'Tcl', color: 'Sand' }
  ];
  
  const [langName, setLangName] = useState('');
  const [langColor, setLangColor] = useState('');
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [point, setPoint] = useState(0);
  const [fail, setFail] = useState(0);
  const [showList, setShowList] = useState(true);
  const [results, setResults] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const successAudio = new Audio('C:/Users/PC Tech Services/Desktop/RNN_2024/RNN 24/RNN24-Assignment/RNN-Game/src/fail.mp3');
  const failureAudio = new Audio('C:/Users/PC Tech Services/Desktop/RNN_2024/RNN 24/RNN24-Assignment/RNN-Game/src/success.mp3')

  const maxAttempts = 5;

  // Check if the color has already been used
  const colorAlreadyThere = results.some(
    (obj) =>
      obj.color.toLowerCase() === langColor.toLowerCase() && 
      obj.name.toLowerCase() === langName.toLowerCase()
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowList(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (endGame) {
      setShowTable(true);
    }
  }, [endGame]);

  function handleCheck(e) {
    e.preventDefault();

    const nameExists = programmingLang.some(
      (obj) => obj.name.toLowerCase() === langName.toLowerCase()
    );

    if (nameExists) {
      const isMatch = programmingLang.some(
        (obj) =>
          obj.name.toLowerCase() === langName.toLowerCase() &&
          obj.color.toLowerCase() === langColor.toLowerCase()
      );

      if (isMatch && !colorAlreadyThere) {
        successAudio.play();
        setMessage('CORRECT!! You win');
        setBgColor(langColor);
        setPoint(point + 1);
        setFail(0);
        setResults((prevResults) => [
          ...prevResults,
          { attempt: results.length + 1, name: langName, color: langColor, result: 'win' },
        ]);
        if (point + 1 === 20) {
          setMessage("You've reached the top level, start all over");
          setEndGame(true);
          successAudio.play();
        }
      } else if (colorAlreadyThere) {
        failureAudio.play();
        const newFail = fail + 1;
        setFail(newFail);
        setMessage("SORRY!! You've already used this color and language! Choose a different one");
        setBgColor('red');
        setResults((prevResults) => [
          ...prevResults,
          { attempt: results.length + 1, name: langName, color: langColor, result: 'lose' },
        ]);

        if (newFail === maxAttempts) {
          failureAudio.play();
          setMessage("You've made more than 5 attempts, Sorry you can't continue");
          setLangName('');
          setLangColor('');
          setEndGame(true);
        }
      } else {
        failureAudio.play();
        const newFail = fail + 1;
        setFail(newFail);
        setMessage("SORRY!! Color doesn't match, try again");
        setBgColor('red');
        setResults((prevResults) => [
          ...prevResults,
          { attempt: results.length + 1, name: langName, color: langColor, result: 'lose' },
        ]);

        if (newFail === maxAttempts) {
          setMessage("You've made more than 5 attempts, Sorry you can't continue");
          setLangName('');
          setLangColor('');
          setEndGame(true);
          failureAudio.play()
        }
      }
    } else {
      setMessage('Please choose a Valid programming language');
    }
  }

  return (
    <div className='main'>
      <h1>Welcome To Our Programming Language Game</h1>
      <p className='p1'>Match a language with its color and gain a point!</p>

      {showList ? (
        <div>
          <h4>Memorize the Programming Languages and their Colors</h4>
          <ul>
            {programmingLang.map((lang, index) => (
              <li key={index}>
                {lang.name} - {lang.color}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <form onSubmit={handleCheck}>
            <div>
              <input
                type="text"
                placeholder="Language name"
                value={langName}
                onChange={(e) => setLangName(e.target.value)}
                disabled={fail >= maxAttempts}
              />
            </div>
            <br />
            <div>
              <input
                type="text"
                placeholder="Color"
                value={langColor}
                onChange={(e) => setLangColor(e.target.value)}
                disabled={fail >= maxAttempts}
              />
            </div>
            <br />
            <button type="submit" disabled={fail >= maxAttempts || point >= 20}>
              Check
            </button>
          </form>

          <p className='p2'
            style={{
              backgroundColor: bgColor
            }}
          >
            {message}
          </p>

          <p>Points: {point}</p>
          <p>
            You have {maxAttempts - fail} {maxAttempts - fail === 1 ? 'attempt' : 'attempts'} left.
          </p>

          {showTable && (
            <div>
              <h2>Game Results</h2>
              <table>
                <thead>
                  <tr>
                    <th>Attempt Number</th>
                    <th>Color</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index}>
                      <td>{result.attempt}</td>
                      <td>{result.color}</td>
                      <td className='td3' style=
                        {{backgroundColor: result.result === 'win' ? 'green': 'red'}}>
                        {result.result === 'win' ? '✅' : '❌'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProgrammingGame;
