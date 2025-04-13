/**
 * Convert RxDB DataCite object to DataCite XML using xmlbuilder2
 * @param {Object} data - The RxDB document object
 * @returns {string} - DataCite XML string
 */

import { create } from 'xmlbuilder2';

export function convertToDataCiteXML(data) {
    // Requires: npm install xmlbuilder2
    
    // Create root document with namespaces
    const doc = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('resource', {
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xmlns': 'http://datacite.org/schema/kernel-4',
        'xsi:schemaLocation': 'http://datacite.org/schema/kernel-4 http://schema.datacite.org/meta/kernel-4/metadata.xsd'
      });
    
    // Add identifier
    if (data.identifier) {
      doc.ele('identifier', { identifierType: data.identifier.identifierType || 'DOI' })
        .txt(data.identifier.identifier);
    }
    
    // Add creators
    if (data.creators && data.creators.length > 0) {
      const creators = doc.ele('creators');
      
      data.creators.forEach(creator => {
        const creatorEle = creators.ele('creator');
        
        const nameAttrs = creator.nameType ? { nameType: creator.nameType } : {};
        creatorEle.ele('creatorName', nameAttrs).txt(creator.name);
        
        if (creator.givenName) {
          creatorEle.ele('givenName').txt(creator.givenName);
        }
        
        if (creator.familyName) {
          creatorEle.ele('familyName').txt(creator.familyName);
        }
        
        // Add affiliations
        if (creator.affiliations && creator.affiliations.length > 0) {
          creator.affiliations.forEach(affiliation => {
            const affAttrs = {};
            if (affiliation.affiliationIdentifier) {
              affAttrs.affiliationIdentifier = affiliation.affiliationIdentifier;
            }
            if (affiliation.affiliationIdentifierScheme) {
              affAttrs.affiliationIdentifierScheme = affiliation.affiliationIdentifierScheme;
            }
            if (affiliation.schemeUri) {
              affAttrs.schemeURI = affiliation.schemeUri;
            }
            
            creatorEle.ele('affiliation', affAttrs).txt(affiliation.name || '');
          });
        }
        
        // Add nameIdentifiers
        if (creator.nameIdentifiers && creator.nameIdentifiers.length > 0) {
          creator.nameIdentifiers.forEach(nameId => {
            const nameIdAttrs = {};
            if (nameId.nameIdentifierScheme) {
              nameIdAttrs.nameIdentifierScheme = nameId.nameIdentifierScheme;
            }
            if (nameId.schemeUri) {
              nameIdAttrs.schemeURI = nameId.schemeUri;
            }
            
            creatorEle.ele('nameIdentifier', nameIdAttrs).txt(nameId.nameIdentifier || '');
          });
        }
      });
    }
    
    // Add titles
    if (data.Titles && data.Titles.length > 0) {
      const titles = doc.ele('titles');
      
      data.Titles.forEach(title => {
        const titleAttrs = {};
        if (title.titleType) {
          titleAttrs.titleType = title.titleType;
        }
        if (title.lang) {
          titleAttrs['xml:lang'] = title.lang;
        }
        
        titles.ele('title', titleAttrs).txt(title.title);
      });
    }
    
    // Add publisher
    if (data.publisher) {
      const publisherEle = doc.ele('publisher');
      publisherEle.txt(data.publisher.name);
      
      // Add publisher attributes if they exist in the schema
      // Note: Standard DataCite doesn't have publisher attributes, but included for completeness
      if (data.publisher.publisherIdentifier) {
        publisherEle.att('publisherIdentifier', data.publisher.publisherIdentifier);
      }
      if (data.publisher.publisherIdentifierScheme) {
        publisherEle.att('publisherIdentifierScheme', data.publisher.publisherIdentifierScheme);
      }
      if (data.publisher.schemeUri) {
        publisherEle.att('schemeURI', data.publisher.schemeUri);
      }
      if (data.publisher.lang) {
        publisherEle.att('xml:lang', data.publisher.lang);
      }
    }
    
    // Add publication year
    if (data.PublicationYear) {
      doc.ele('publicationYear').txt(data.PublicationYear.toString());
    }
    
    // Add resource type
    if (data.ResourceType) {
      doc.ele('resourceType', { resourceTypeGeneral: data.ResourceType.resourceTypeGeneral })
        .txt(data.ResourceType.resourceType);
    }
    
    // Add subjects
    if (data.Subjects && data.Subjects.length > 0) {
      const subjects = doc.ele('subjects');
      
      data.Subjects.forEach(subject => {
        const subjectAttrs = {};
        if (subject.subjectScheme) {
          subjectAttrs.subjectScheme = subject.subjectScheme;
        }
        if (subject.schemeUri) {
          subjectAttrs.schemeURI = subject.schemeUri;
        }
        if (subject.valueUri) {
          subjectAttrs.valueURI = subject.valueUri;
        }
        if (subject.lang) {
          subjectAttrs['xml:lang'] = subject.lang;
        }
        
        subjects.ele('subject', subjectAttrs).txt(subject.subject);
      });
    }
    
    // Add contributors
    if (data.Contributors && data.Contributors.length > 0) {
      const contributors = doc.ele('contributors');
      
      data.Contributors.forEach(contributor => {
        const contributorAttrs = {};
        if (contributor.contributorType) {
          contributorAttrs.contributorType = contributor.contributorType;
        }
        
        const contributorEle = contributors.ele('contributor', contributorAttrs);
        
        const nameAttrs = contributor.nameType ? { nameType: contributor.nameType } : {};
        contributorEle.ele('contributorName', nameAttrs).txt(contributor.name);
        
        if (contributor.givenName) {
          contributorEle.ele('givenName').txt(contributor.givenName);
        }
        
        if (contributor.familyName) {
          contributorEle.ele('familyName').txt(contributor.familyName);
        }
        
        // Add affiliations
        if (contributor.affiliations && contributor.affiliations.length > 0) {
          contributor.affiliations.forEach(affiliation => {
            const affAttrs = {};
            if (affiliation.affiliationIdentifier) {
              affAttrs.affiliationIdentifier = affiliation.affiliationIdentifier;
            }
            if (affiliation.affiliationIdentifierScheme) {
              affAttrs.affiliationIdentifierScheme = affiliation.affiliationIdentifierScheme;
            }
            if (affiliation.schemeUri) {
              affAttrs.schemeURI = affiliation.schemeUri;
            }
            
            contributorEle.ele('affiliation', affAttrs).txt(affiliation.name || '');
          });
        }
        
        // Add nameIdentifiers
        if (contributor.nameIdentifiers && contributor.nameIdentifiers.length > 0) {
          contributor.nameIdentifiers.forEach(nameId => {
            const nameIdAttrs = {};
            if (nameId.nameIdentifierScheme) {
              nameIdAttrs.nameIdentifierScheme = nameId.nameIdentifierScheme;
            }
            if (nameId.schemeUri) {
              nameIdAttrs.schemeURI = nameId.schemeUri;
            }
            
            contributorEle.ele('nameIdentifier', nameIdAttrs).txt(nameId.nameIdentifier || '');
          });
        }
      });
    }
    
    // Add dates
    if (data.dates && data.dates.length > 0) {
      const dates = doc.ele('dates');
      
      data.dates.forEach(date => {
        const dateAttrs = {};
        if (date.dateType) {
          dateAttrs.dateType = date.dateType;
        }
        
        const dateEle = dates.ele('date', dateAttrs).txt(date.date);
        if (date.dateInformation) {
          dateEle.att('dateInformation', date.dateInformation);
        }
      });
    }
    
    // Add language
    if (data.Language) {
      doc.ele('language').txt(data.Language);
    }
    
    // Add alternate identifiers
    if (data.alternateIdentifiers && data.alternateIdentifiers.length > 0) {
      const alternateIds = doc.ele('alternateIdentifiers');
      
      data.alternateIdentifiers.forEach(altId => {
        alternateIds.ele('alternateIdentifier', { 
          alternateIdentifierType: altId.alternateIdentifierType 
        }).txt(altId.alternateIdentifier);
      });
    }
    
    // Add related identifiers
    if (data.relatedIdentifiers && data.relatedIdentifiers.length > 0) {
      const relatedIds = doc.ele('relatedIdentifiers');
      
      data.relatedIdentifiers.forEach(relId => {
        const relIdAttrs = {
          relatedIdentifierType: relId.relatedIdentifierType,
          relationType: relId.relationType
        };
        
        if (relId.resourceTypeGeneral) {
          relIdAttrs.resourceTypeGeneral = relId.resourceTypeGeneral;
        }
        if (relId.schemeUri) {
          relIdAttrs.schemeURI = relId.schemeUri;
        }
        if (relId.relatedMetadataScheme) {
          relIdAttrs.relatedMetadataScheme = relId.relatedMetadataScheme;
        }
        
        relatedIds.ele('relatedIdentifier', relIdAttrs).txt(relId.relatedIdentifier);
      });
    }
    
    // Add sizes
    if (data.size && data.size.length > 0) {
      const sizes = doc.ele('sizes');
      data.size.forEach(size => {
        sizes.ele('size').txt(size);
      });
    }
    
    // Add formats
    if (data.formats && data.formats.length > 0) {
      const formats = doc.ele('formats');
      data.formats.forEach(format => {
        formats.ele('format').txt(format);
      });
    }
    
    // Add version
    if (data.version) {
      doc.ele('version').txt(data.version);
    }
    
    // Add rights
    if (data.rightsList && data.rightsList.length > 0) {
      const rights = doc.ele('rightsList');
      
      data.rightsList.forEach(right => {
        const rightAttrs = {};
        if (right.rightsUri) {
          rightAttrs.rightsURI = right.rightsUri;
        }
        if (right.schemeUri) {
          rightAttrs.schemeURI = right.schemeUri;
        }
        if (right.rightsIdentifier) {
          rightAttrs.rightsIdentifier = right.rightsIdentifier;
        }
        if (right.rightsIdentifierScheme) {
          rightAttrs.rightsIdentifierScheme = right.rightsIdentifierScheme;
        }
        if (right.lang) {
          rightAttrs['xml:lang'] = right.lang;
        }
        
        rights.ele('rights', rightAttrs).txt(right.rights);
      });
    }
    
    // Add descriptions
    if (data.description && data.description.length > 0) {
      const descriptions = doc.ele('descriptions');
      
      data.description.forEach(desc => {
        const descAttrs = {
          descriptionType: desc.descriptionType
        };
        if (desc.lang) {
          descAttrs['xml:lang'] = desc.lang;
        }
        
        descriptions.ele('description', descAttrs).txt(desc.description);
      });
    }
    
    // Add geo locations
    if (data.geoLocation && data.geoLocation.length > 0) {
      const geoLocations = doc.ele('geoLocations');
      
      data.geoLocation.forEach(geo => {
        const geoLoc = geoLocations.ele('geoLocation');
        
        if (geo.geoLocationPlace) {
          geoLoc.ele('geoLocationPlace').txt(geo.geoLocationPlace);
        }
        
        if (geo.geoLocationPoint && (geo.geoLocationPoint.pointLongitude || geo.geoLocationPoint.pointLatitude)) {
          const point = geoLoc.ele('geoLocationPoint');
          if (geo.geoLocationPoint.pointLongitude) {
            point.ele('pointLongitude').txt(geo.geoLocationPoint.pointLongitude);
          }
          if (geo.geoLocationPoint.pointLatitude) {
            point.ele('pointLatitude').txt(geo.geoLocationPoint.pointLatitude);
          }
        }
        
        if (geo.geoLocationBox) {
          const box = geoLoc.ele('geoLocationBox');
          if (geo.geoLocationBox.westBoundLongitude) {
            box.ele('westBoundLongitude').txt(geo.geoLocationBox.westBoundLongitude);
          }
          if (geo.geoLocationBox.eastBoundLongitude) {
            box.ele('eastBoundLongitude').txt(geo.geoLocationBox.eastBoundLongitude);
          }
          if (geo.geoLocationBox.southBoundLatitude) {
            box.ele('southBoundLatitude').txt(geo.geoLocationBox.southBoundLatitude);
          }
          if (geo.geoLocationBox.northBoundLatitude) {
            box.ele('northBoundLatitude').txt(geo.geoLocationBox.northBoundLatitude);
          }
        }
        
        if (geo.geoLocationPolygon) {
          const polygon = geoLoc.ele('geoLocationPolygon');
          
          // Handle polygon points
          if (Array.isArray(geo.geoLocationPolygon.polygonPoint)) {
            geo.geoLocationPolygon.polygonPoint.forEach(point => {
              const polygonPoint = polygon.ele('polygonPoint');
              if (point.pointLongitude) {
                polygonPoint.ele('pointLongitude').txt(point.pointLongitude);
              }
              if (point.pointLatitude) {
                polygonPoint.ele('pointLatitude').txt(point.pointLatitude);
              }
            });
          }
          
          // Handle individual point properties if they're direct properties
          if (geo.geoLocationPolygon.pointLongitude && geo.geoLocationPolygon.pointLatitude) {
            const polygonPoint = polygon.ele('polygonPoint');
            polygonPoint.ele('pointLongitude').txt(geo.geoLocationPolygon.pointLongitude);
            polygonPoint.ele('pointLatitude').txt(geo.geoLocationPolygon.pointLatitude);
          }
          
          // Handle inPolygonPoint if present
          if (geo.geoLocationPolygon.inPolygonPoint) {
            const inPolygonPoint = polygon.ele('inPolygonPoint');
            
            if (typeof geo.geoLocationPolygon.inPolygonPoint === 'object') {
              if (geo.geoLocationPolygon.inPolygonPoint.pointLongitude) {
                inPolygonPoint.ele('pointLongitude').txt(geo.geoLocationPolygon.inPolygonPoint.pointLongitude);
              }
              if (geo.geoLocationPolygon.inPolygonPoint.pointLatitude) {
                inPolygonPoint.ele('pointLatitude').txt(geo.geoLocationPolygon.inPolygonPoint.pointLatitude);
              }
            }
          }
        }
      });
    }
    
    // Add funding references
    if (data.fundingReferences && data.fundingReferences.length > 0) {
      const fundingRefs = doc.ele('fundingReferences');
      
      data.fundingReferences.forEach(funding => {
        const fundingRef = fundingRefs.ele('fundingReference');
        
        fundingRef.ele('funderName').txt(funding.funderName);
        
        if (funding.funderIdentifier) {
          const funderIdAttrs = {};
          if (funding.funderIdentifierType) {
            funderIdAttrs.funderIdentifierType = funding.funderIdentifierType;
          }
          fundingRef.ele('funderIdentifier', funderIdAttrs).txt(funding.funderIdentifier);
        }
        
        if (funding.awardNumber) {
          const awardAttrs = {};
          if (funding.awardUri) {
            awardAttrs.awardURI = funding.awardUri;
          }
          fundingRef.ele('awardNumber', awardAttrs).txt(funding.awardNumber);
        }
        
        if (funding.awardTitle) {
          fundingRef.ele('awardTitle').txt(funding.awardTitle);
        }
      });
    }
    
    // Add related items
    if (data.relatedItems && data.relatedItems.length > 0) {
      const relatedItems = doc.ele('relatedItems');
      
      data.relatedItems.forEach(item => {
        const relatedItem = relatedItems.ele('relatedItem', {
          relatedItemType: item.relatedItemType,
          relationType: item.relationType
        });
        
        // Add related item identifier if available
        if (item.relatedItemIdentifier) {
          const relatedItemIdentifier = relatedItem.ele('relatedItemIdentifier');
          
          if (item.relatedItemIdentifier.relatedItemIdentifierType) {
            relatedItemIdentifier.att('relatedItemIdentifierType', item.relatedItemIdentifier.relatedItemIdentifierType);
          }
          
          if (item.relatedItemIdentifier.relatedMetadataScheme) {
            relatedItemIdentifier.att('relatedMetadataScheme', item.relatedItemIdentifier.relatedMetadataScheme);
          }
          
          if (item.relatedItemIdentifier.schemeUri) {
            relatedItemIdentifier.att('schemeURI', item.relatedItemIdentifier.schemeUri);
          }
          
          if (item.relatedItemIdentifier.schemeType) {
            relatedItemIdentifier.att('schemeType', item.relatedItemIdentifier.schemeType);
          }
          
          // Add text content if provided
          if (item.relatedItemIdentifier.value) {
            relatedItemIdentifier.txt(item.relatedItemIdentifier.value);
          }
        }
        
        // Add creators
        if (item.creators && item.creators.length > 0) {
          const creators = relatedItem.ele('creators');
          
          item.creators.forEach(creator => {
            const creatorEle = creators.ele('creator');
            
            const nameAttrs = creator.nameType ? { nameType: creator.nameType } : {};
            creatorEle.ele('creatorName', nameAttrs).txt(creator.name);
            
            if (creator.givenName) {
              creatorEle.ele('givenName').txt(creator.givenName);
            }
            
            if (creator.familyName) {
              creatorEle.ele('familyName').txt(creator.familyName);
            }
            
            // Add affiliations
            if (creator.affiliations && creator.affiliations.length > 0) {
              creator.affiliations.forEach(affiliation => {
                const affAttrs = {};
                if (affiliation.affiliationIdentifier) {
                  affAttrs.affiliationIdentifier = affiliation.affiliationIdentifier;
                }
                if (affiliation.affiliationIdentifierScheme) {
                  affAttrs.affiliationIdentifierScheme = affiliation.affiliationIdentifierScheme;
                }
                if (affiliation.schemeUri) {
                  affAttrs.schemeURI = affiliation.schemeUri;
                }
                
                creatorEle.ele('affiliation', affAttrs).txt(affiliation.name || '');
              });
            }
            
            // Add nameIdentifiers
            if (creator.nameIdentifiers && creator.nameIdentifiers.length > 0) {
              creator.nameIdentifiers.forEach(nameId => {
                const nameIdAttrs = {};
                if (nameId.nameIdentifierScheme) {
                  nameIdAttrs.nameIdentifierScheme = nameId.nameIdentifierScheme;
                }
                if (nameId.schemeUri) {
                  nameIdAttrs.schemeURI = nameId.schemeUri;
                }
                
                creatorEle.ele('nameIdentifier', nameIdAttrs).txt(nameId.nameIdentifier || '');
              });
            }
          });
        }
        
        // Add titles (assuming the same structure as top-level titles)
        if (item.titles && item.titles.length > 0) {
          const titles = relatedItem.ele('titles');
          
          item.titles.forEach(title => {
            const titleAttrs = {};
            if (title.titleType) {
              titleAttrs.titleType = title.titleType;
            }
            if (title.lang) {
              titleAttrs['xml:lang'] = title.lang;
            }
            
            titles.ele('title', titleAttrs).txt(title.title);
          });
        }
        
        // Add publicationYear
        if (item.publicationYear) {
          relatedItem.ele('publicationYear').txt(item.publicationYear.toString());
        }
        
        // Add volume
        if (item.volume) {
          relatedItem.ele('volume').txt(item.volume);
        }
        
        // Add issue
        if (item.issue) {
          relatedItem.ele('issue').txt(item.issue);
        }
        
        // Add number
        if (item.number) {
          const numberAttrs = {};
          if (item.number.numberType) {
            numberAttrs.numberType = item.number.numberType;
          }
          relatedItem.ele('number', numberAttrs).txt(item.number.number);
        }
        
        // Add firstPage
        if (item.firstPage) {
          relatedItem.ele('firstPage').txt(item.firstPage);
        }
        
        // Add lastPage
        if (item.lastPage) {
          relatedItem.ele('lastPage').txt(item.lastPage);
        }
        
        // Add publisher
        if (item.publisher) {
          relatedItem.ele('publisher').txt(item.publisher);
        }
        
        // Add edition
        if (item.edition) {
          relatedItem.ele('edition').txt(item.edition);
        }
        
        // Add contributors
        if (item.contributors && item.contributors.length > 0) {
          const contributors = relatedItem.ele('contributors');
          
          item.contributors.forEach(contributor => {
            const contributorAttrs = {};
            if (contributor.contributorType) {
              contributorAttrs.contributorType = contributor.contributorType;
            }
            
            const contributorEle = contributors.ele('contributor', contributorAttrs);
            
            const nameAttrs = contributor.nameType ? { nameType: contributor.nameType } : {};
            contributorEle.ele('contributorName', nameAttrs).txt(contributor.name);
            
            if (contributor.givenName) {
              contributorEle.ele('givenName').txt(contributor.givenName);
            }
            
            if (contributor.familyName) {
              contributorEle.ele('familyName').txt(contributor.familyName);
            }
            
            // Add affiliations
            if (contributor.affiliations && contributor.affiliations.length > 0) {
              contributor.affiliations.forEach(affiliation => {
                const affAttrs = {};
                if (affiliation.affiliationIdentifier) {
                  affAttrs.affiliationIdentifier = affiliation.affiliationIdentifier;
                }
                if (affiliation.affiliationIdentifierScheme) {
                  affAttrs.affiliationIdentifierScheme = affiliation.affiliationIdentifierScheme;
                }
                if (affiliation.schemeUri) {
                  affAttrs.schemeURI = affiliation.schemeUri;
                }
                
                contributorEle.ele('affiliation', affAttrs).txt(affiliation.name || '');
              });
            }
            
            // Add nameIdentifiers
            if (contributor.nameIdentifiers && contributor.nameIdentifiers.length > 0) {
              contributor.nameIdentifiers.forEach(nameId => {
                const nameIdAttrs = {};
                if (nameId.nameIdentifierScheme) {
                  nameIdAttrs.nameIdentifierScheme = nameId.nameIdentifierScheme;
                }
                if (nameId.schemeUri) {
                  nameIdAttrs.schemeURI = nameId.schemeUri;
                }
                
                contributorEle.ele('nameIdentifier', nameIdAttrs).txt(nameId.nameIdentifier || '');
              });
            }
          });
        }
      });
    }
    
    // End XML document
    return doc.end({ prettyPrint: true });
  }
