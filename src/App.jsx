import { useCallback, useEffect, useRef, useState } from "react";

function App() {
	const [password, setPassword] = useState("");
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);

	const passRef = useRef(null);

	const passGenerator = useCallback(() => {
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		if (numberAllowed) str += "0123456789";
		if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

		for (let i = 0; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length - 1);
			pass += str.charAt(char);
		}
		setPassword(pass);
	}, [length, numberAllowed, charAllowed, setPassword]);

	const copyPassword = useCallback(() => {
		passRef.current?.select();
		passRef.current?.setSelectionRange(0, 20);
		window.navigator.clipboard.writeText(password);
		document.getElementById("btn").innerText = "Done";
		document.getElementById("btn").style.backgroundColor = "green";
	}, [password]);

	useEffect(() => {
		passGenerator();
	}, [length, numberAllowed, charAllowed, passGenerator]);

	return (
		<>
			<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
				<h1 className="text-white text-center my-3">Password Generator</h1>
				<div className="flex shadow rounded-lg overflow-hidden mb-4">
					<input
						type="text"
						value={password}
						className="outline-none w-full py-2 px-3"
						placeholder="Password"
						readOnly
					/>
					<button
						onClick={copyPassword}
						id="btn"
						className="outline-none bg-blue-700 text-white px-3 pb-2 shrink-0"
					>
						copy
					</button>
				</div>

				<div className=" flex text-sm gap-x-2">
					<div className="flex items-center gap-x-1">
						<input
							type="range"
							min={8}
							max={20}
							value={length}
							className="cursor-pointer"
							onChange={(e) => {
								setLength(e.target.value);
							}}
						/>
						<label>Length: {length}</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={numberAllowed}
							id="numberInput"
							onChange={() => {
								setNumberAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor="numberInput">Numbers</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={charAllowed}
							id="charInput"
							onChange={() => {
								setCharAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor="charInput">Characters</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
