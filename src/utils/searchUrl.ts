import { SearchCriteria } from '@/types/search';

/**
 * Converts search criteria and packet into URLSearchParams
 */
export function criteriaToSearchParams(criteria: SearchCriteria, packet: number): URLSearchParams {
  const params = new URLSearchParams();

  if (criteria.selectedTypes.length > 0) {
    params.set('types', criteria.selectedTypes.join(','));
  }

  if (criteria.selectedTags.mustHave.length > 0) {
    params.set('mustHave', criteria.selectedTags.mustHave.join(','));
  }

  if (criteria.selectedTags.mustNotHave.length > 0) {
    params.set('haveNot', criteria.selectedTags.mustNotHave.join(','));
  }

  if (criteria.selectedTags.shouldHaveAtLeastOne.length > 0) {
    params.set('atLeastOne', criteria.selectedTags.shouldHaveAtLeastOne.join(','));
  }

  if (criteria.textSearch.query) {
    params.set('query', criteria.textSearch.query);
  }

  if (criteria.textSearch.titleOnly) {
    params.set('titleOnly', 'true');
  }

  if (criteria.includeExpiredTables) {
    params.set('showExpired', 'true');
  }

  if (packet > 1) {
    params.set('page', packet.toString());
  }

  return params;
}

/**
 * Parses URLSearchParams into search criteria and packet
 */
export function searchParamsToCriteria(params: URLSearchParams): { criteria: SearchCriteria; packet: number } {
  const typesStr = params.get('types');
  const mustStr = params.get('mustHave');
  const notStr = params.get('haveNot');
  const oneStr = params.get('atLeastOne');
  const q = params.get('query') || '';
  const titleOnly = params.get('titleOnly') === 'true';
  const expired = params.get('showExpired') === 'true';
  const pStr = params.get('page');

  const criteria: SearchCriteria = {
    selectedTypes: typesStr ? typesStr.split(',').filter(Boolean) : [],
    selectedTags: {
      mustHave: mustStr ? mustStr.split(',').filter(Boolean).map(Number).filter(n => !isNaN(n)) : [],
      mustNotHave: notStr ? notStr.split(',').filter(Boolean).map(Number).filter(n => !isNaN(n)) : [],
      shouldHaveAtLeastOne: oneStr ? oneStr.split(',').filter(Boolean).map(Number).filter(n => !isNaN(n)) : [],
    },
    textSearch: {
      query: q,
      titleOnly: titleOnly,
    },
    includeExpiredTables: expired,
  };

  const packet = pStr ? parseInt(pStr, 10) || 1 : 1;

  return { criteria, packet };
}
