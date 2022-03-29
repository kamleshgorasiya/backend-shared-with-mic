import { UserResponses } from './types';
/**
 * Prompts the user to determine how the new Vendure app should be configured.
 */
export declare function gatherUserResponses(root: string): Promise<UserResponses>;
/**
 * Returns mock "user response" without prompting, for use in CI
 */
export declare function gatherCiUserResponses(root: string): Promise<UserResponses>;
