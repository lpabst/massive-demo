
insert into incidents (state, injuryId, causeId) 
values ($1, $2, $3) 
returning incidents.id as incidentId, incidents.state, injuries.name as injuryName, affectedareas.name as affectedArea, causes.name as cause from incidents
join injuries on injuries.id = incidents.injuryId
join affectedAreas on affectedAreas.id = injuries.affectedareaid
join causes on causes.id = incidents.causeid
order by incidentid