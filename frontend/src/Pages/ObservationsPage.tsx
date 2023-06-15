import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Select from 'react-select';
import Observation from '../components/Observation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimelineContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 60%;
  border: 4px solid #ADE1EE;
  border-radius: 10px;
  padding: 16px;
  max-width: 600px;
  list-style-type: none;
  @media (max-width: 800px) {
    width: 90%;
    margin-top: 36px;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  width: 60%;
  border: 4px solid #ADE1EE;
  border-radius: 10px;
  padding: 16px;
  max-width: 600px;
  list-style-type: none;
  @media (max-width: 800px) {
    width: 90%;
    margin-top: 36px;
  }
`;

const Pagination = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding-bottom: 16px;
`

const PaginationButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: #38827e;
  color: #ffffff;
  width: 72px;
  padding: 8px;
  border-radius: 10px;
  border: 0px;
  cursor: pointer;

  &:hover {
    background-color: #49ABA6;
  }

  &:active {
    transform: translateY(1px);
    background-color: #26615f;
  }
`

const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
`

const ObservationsPage = () => {
  const { care_recipient_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [careRecipient, setCareRecipient] = useState<{date: { id: string, name: string}} | null>(null);
  const [observationEvents, setObservationEvents] = useState<{date: { id: string, name: string}} | null>(null);
  const [filters, setFilters] = useState<[]>([]);
  // do something with pagination
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pages, setPages] = useState<number | null>(null);
  const [observationEventsTotal, setObservationEventsTotal] = useState<number | null>(null);


  useEffect(() => {
    const fetchCareRecipient = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/care-recipients/${care_recipient_id}`);
        const json = await response.json();
        setCareRecipient(json.data);
      } catch (error) {
        console.error("Error fetching care recipient:", error);
      }
    };

    if (care_recipient_id) {
      const fetchObservationEvents = async () => {
        try {
          let url = `${process.env.REACT_APP_API_URL}/observations/${care_recipient_id}?page=${pageNumber}`
          if (filters.length) {
            url = `${url}&filters=${filters.map(filter => filter.value).join(",")}`
          }
          const response = await fetch(url);
          const json = await response.json();
          setPages(json.pages);
          setObservationEventsTotal(json.total);
          setObservationEvents(json.observations);
        } catch (error) {
          console.error("Error fetching observation events:", error);
        }
      };

      fetchObservationEvents();
    }

    setLoading(false);
    fetchCareRecipient();
  }, [care_recipient_id, pageNumber, filters]);

  const selectOptions = [
    { label: "Fluid intake", value: "fluid_intake" },
    { label: "Physical health observation", value: "physical_health_observation" },
    { label: "Mood", value: "mood" },
    { label: "Incontinence pad observation", value: "incontinence_pad_observation" },
    { label: "General", value: "general" },
    { label: "Food intake", value: "food_intake" },
    { label: "Mental health", value: "mental_health" },
    { label: "Catheter observation", value: "catheter_observation" }
  ];

  console.log(pageNumber, pages)

  const changePage = (event) => {
    const buttonText = event.target.outerText;
    if (buttonText === "Next") {
      setPageNumber(pageNumber + 1)
    }

    if (buttonText === "Back") {
      setPageNumber(pageNumber - 1)
    }
  }

  const handleSelectChange = (items) => {
    setFilters(items)
  }

  console.log(filters)
  return (
    <Container>
      <FiltersContainer>
        <Select
          onChange={handleSelectChange}
          isMulti
          name="event-type-filters"
          options={selectOptions}
        />
      </FiltersContainer>

      { (!loading && observationEvents && observationEventsTotal! > 0) && (
        <>
          <TimelineContainer>
            {observationEvents.map((observationEvent: any) => {
              return (<Observation observation={observationEvent} key={observationEvent.id}/>)})}
          </TimelineContainer>


          <Pagination>
            Page {pageNumber} of {pages}
            <PaginationButtons>
              {pageNumber !== 1 && 
                <PaginationButton onClick={changePage}>Back</PaginationButton>
              }
              {pageNumber !== pages && 
                <PaginationButton onClick={changePage}>Next</PaginationButton>
              }
            </PaginationButtons>
          </Pagination>
        </>
      )}
      {(!loading && observationEvents && observationEventsTotal === 0) && (
        <div style={{marginTop: "16px"}}>
          Sorry, your search returned no results, please try again
        </div>
      ) }
    </Container>
  )
}

export default ObservationsPage;
