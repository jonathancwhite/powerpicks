import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CollegeFootballTest from "../../../components/test/CollegeFootballTest";

const Pickems = () => {
	const { leaguesJoined, isLoading, isError } = useSelector(
		(state) => state.leaguesJoined,
	);

	const [noLeaguesJoined, setNoLeaguesJoined] = useState(false);

	useEffect(() => {
		toast.dismiss();
		// check if leaguesJoined is already being fetched by sidebar
		if (leaguesJoined.length === 0) {
			if (!isLoading) {
				// setNoLeaguesJoined(true);
			}
		}
	});

	return (
		<>
			{noLeaguesJoined ? (
				<div className='currentLeague'>
					<div className='currentLeague__controlBar'>
						<div className='currentLeague__header'>
							<h2>Home</h2>
							<span>Dashboard</span>
						</div>
					</div>
					<div className='currentLeague__main'>
						<div className='currentLeague__paper xl'>
							<h3>Your Joined Leagues Will Show Here</h3>
						</div>
						<div className='currentLeague__paper sm'>
							<div className='membersLIst'>
								<div className='membersList__header'>
									<h3>League Members</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='currentLeague'>
					<div className='currentLeague__controlBar'>
						<div className='currentLeague__header'>
							<h2>Home</h2>
							{isLoading ? (
								<span>Loading Leagues</span>
							) : (
								<span>Dashboard</span>
							)}
						</div>
					</div>

					<div className='currentLeague__main'>
						<div className='currentLeague__paper xl'>
							<div className='centeredContainer'>
								{isLoading ? (
									<div className='spinner'></div>
								) : (
									// <CollegeFootballTest />
									<div className='h4'>Picks</div>
								)}
							</div>
						</div>
						<div className='currentLeague__paper sm'>
							<div className='currentLeague__members'>
								<div className='centeredContainer'>
									<h4>Shhhh...</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Pickems;
