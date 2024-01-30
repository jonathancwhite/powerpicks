import React from "react";
import { IoAmericanFootballOutline } from "react-icons/io5";
import { IoIosFootball, IoIosTrophy } from "react-icons/io";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../slices/leaguesAvailableSlice";
import { LiaHockeyPuckSolid } from "react-icons/lia";

const LeagueFilter = () => {
	const dispatch = useDispatch();
	const filterSport = useSelector((state) => state.leaguesAvailable.filter);

	const setLeagueFilter = (filter) => {
		try {
			dispatch(setFilter(filter));
		} catch (error) {
			toast.error(error.message);
		}
	};

	const isActive = (filter) => {
		return filterSport === filter ? "active" : "";
	};

	return (
		<div className='leagueFilter'>
			<div
				className={`leagueFilter__item ${isActive("ALL")}`}
				onClick={() => setLeagueFilter("ALL")}>
				<div className='sport__icon'>
					<IoIosTrophy />
				</div>
				<div className='sport__name'>
					<h4>ALL</h4>
				</div>
			</div>
			<div
				className={`leagueFilter__item ${isActive("NFL")}`}
				onClick={() => setLeagueFilter("NFL")}>
				<div className='sport__icon'>
					<IoAmericanFootballOutline />
				</div>
				<div className='sport__name'>
					<h4>NFL</h4>
				</div>
			</div>
			<div
				className={`leagueFilter__item ${isActive("XFL")}`}
				onClick={() => setLeagueFilter("XFL")}>
				<div className='sport__icon'>
					<IoAmericanFootballOutline />
				</div>
				<div className='sport__name'>
					<h4>XFL</h4>
				</div>
			</div>
			<div
				className={`leagueFilter__item ${isActive("USFL")}`}
				onClick={() => setLeagueFilter("USFL")}>
				<div className='sport__icon'>
					<IoAmericanFootballOutline />
				</div>
				<div className='sport__name'>
					<h4>USFL</h4>
				</div>
			</div>
			<div
				className={`leagueFilter__item ${isActive("NCAAF")}`}
				onClick={() => setLeagueFilter("NCAAF")}>
				<div className='sport__icon'>
					<IoAmericanFootballOutline />
				</div>
				<div className='sport__name'>
					<h4>NCAAF</h4>
				</div>
			</div>
			<div
				className={`leagueFilter__item ${isActive("MLS")}`}
				onClick={() => setLeagueFilter("MLS")}>
				<div className='sport__icon'>
					<IoIosFootball />
				</div>
				<div className='sport__name'>
					<h4>MLS</h4>
				</div>
			</div>
			<div
				className={`leagueFilter__item ${isActive("NHL")}`}
				onClick={() => setLeagueFilter("NHL")}>
				<div className='sport__icon'>
					<LiaHockeyPuckSolid />
				</div>
				<div className='sport__name'>
					<h4>NHL</h4>
				</div>
			</div>
		</div>
	);
};

export default LeagueFilter;
