import { useEffect, useState } from "react";

const CollegeFootballTest = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [conferences, setConferences] = useState([]);

	const fetchCollegeFootballConferences = async () => {
		setIsLoading(true);

		const response = await fetch("http://jcwdev.local:5173/api/cfb");

		const data = await response.json();

		if (data) {
			setIsLoading(false);
		}

		return data;
	};

	const handleButtonClick = async () => {
		// let data = await fetchCollegeFootballConferences();
		let data = [];
		setConferences(data);
	};

	useEffect(() => {
		// fetchCollegeFootballConferences();
	}, []);

	return (
		<div className='apiTesting'>
			<h1>College Football Test</h1>
			<button className='btn btn--cta' onClick={handleButtonClick}>
				{isLoading ? (
					<div className='spinner'></div>
				) : (
					<span>Fetch CFB Data</span>
				)}
			</button>

			{conferences.length > 1 ? (
				<div className='conferences'>
					{conferences.map((conference) => (
						<div className='conference' key={conference.id}>
							<h3>{conference.name}</h3>
							<p>{conference.short_name}</p>
							<p>{conference.abbreviation}</p>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};

export default CollegeFootballTest;
